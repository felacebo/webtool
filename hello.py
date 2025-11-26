from flask import Flask, render_template, request, jsonify
import paramiko

app = Flask(__name__)

@app.route('/')
def entry_page() -> 'html':
    return render_template('index.html')

@app.route('/test')
def entry_test() -> 'html':
    return render_template('test.html')

@app.route('/to_remote')
def entry_page3() -> 'html':
    return render_template('remote_access.html')

@app.route('/to_quick_config')
def entry_quick_config() -> 'html':
    return render_template('quick_config.html')

@app.route('/parse-ip-text', methods=['POST'])
def pares_ip_text():
    data = request.json
    ips = data['ips']
    ips.append('172.20.93.118')
    results = []
    results.append({'ips': ips})
    print(results)
    return jsonify(results)

@app.route('/execute-command', methods=['POST'])
def execute_command():
    data = request.json
    ips = data['ips']
    command = data['command']
    results = []

    print(data)

    for ip in ips:
        try:
            # Initialize the SSH client
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(hostname=ip, port=22, username=data['username'], password=data['userpass'], timeout=10)

            # Execute the command
            stdin, stdout, stderr = client.exec_command(command)
            result = stdout.read().decode('utf-8')
            error = stderr.read().decode('utf-8')
            print('result:', result)
            print('error:', error)

            # Close the SSH connection
            client.close()

            if error:
                results.append({'ip': ip, 'output': error})
            else:
                results.append({'ip': ip, 'output': result})

        except Exception as e:
            results.append({'ip': ip, 'output': str(e)})

    print(results)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)