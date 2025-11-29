"""远程访问路由"""
from flask import Blueprint, render_template, request, jsonify
from .services import SSHService

# 创建蓝图
remote_access_bp = Blueprint(
    'remote_access',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/remote_access/static'
)

# 创建SSH服务实例
ssh_service = SSHService()


@remote_access_bp.route('/to_remote')
def remote_access():
    """远程访问页面"""
    return render_template('remote_access.html')


@remote_access_bp.route('/parse-ip-text', methods=['POST'])
def parse_ip_text():
    """解析IP文本"""
    data = request.json
    ips = data['ips']
    ips.append('172.20.93.118')
    results = [{'ips': ips}]
    print(results)
    return jsonify(results)


@remote_access_bp.route('/execute-command', methods=['POST'])
def execute_command():
    """执行远程命令"""
    data = request.json
    ips = data['ips']
    command = data['command']
    username = data['username']
    password = data['userpass']
    
    print(data)
    
    results = []
    for ip in ips:
        result = ssh_service.execute_command(ip, username, password, command)
        results.append(result)
    
    print(results)
    return jsonify(results)
