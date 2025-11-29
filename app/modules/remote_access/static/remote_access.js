    // 从文本中提取IP地址的函数
    function extractIPs(text) {
        // IPv4地址正则表达式
        const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
        const matches = text.match(ipRegex) || [];
        
        // 去重并验证IP地址的有效性
        const uniqueIPs = [...new Set(matches)];
        return uniqueIPs.filter(ip => {
            const parts = ip.split('.').map(Number);
            return parts.length === 4 && parts.every(part => part >= 0 && part <= 255);
        });
    }

    function parseIPsBackEnd() {
        const ipInput = document.getElementById('ipInput');
        const text = ipInput.value;
        const extractedIPs = extractIPs(text);
        
        fetch('/parse-ip-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ips: extractedIPs })
        })
        .then(response => response.json())
        .then(data => {
            // 更新IP输入框，只显示提取到的IP地址
            const ipInput = document.getElementById('ipInput');
            ipInput.value = data[0].ips.join('\n')
            parseIPs()
        })
        .catch(error => console.error('Error:', error));
    }

    function parseIPs() {
        const ipInput = document.getElementById('ipInput');
        const text = ipInput.value;
        const ips = extractIPs(text);
        const ipButtons = document.getElementById('ipButtons');
        ipButtons.innerHTML = '';

        // 如果提取到IP，显示IP按钮
        if (ips.length > 0) {
            ips.forEach(ip => {
                const button = document.createElement('button');
                button.textContent = `Execute on ${ip}`;
                button.className = 'ip-button';
                button.onclick = function() { executeOneCommand([ip]); };
                ipButtons.appendChild(button);
            });
        } else {
            // 如果没有提取到IP，显示提示信息
            const noIPMessage = document.createElement('p');
            noIPMessage.textContent = '未提取到有效IP地址';
            noIPMessage.style.color = '#666';
            noIPMessage.style.fontStyle = 'italic';
            ipButtons.appendChild(noIPMessage);
        }
    }

    function executeAllCommands() {
        const ipInput = document.getElementById('ipInput');
        let ips = ipInput.value.split('\n').map(ip => ip.trim()).filter(ip => ip);

        if (ips.length === 0) {
            alert('Please parse IPs first.');
            return;
        }

        executeCommand(ips);
    }

    function executeOneCommand(ip) {
        executeCommand(ip);
    }

    function executeCommand(ipOrIps) {
        let userCommand = document.getElementById('userCommand').value;
        if (!userCommand) {
            alert('Please enter a command.');
            return;
        }

        let userName = document.getElementById('user_name').value;
        let userPwd = document.getElementById('user_pwd').value;
        if (!userName || !userPwd) {
            alert('Please enter username or password.');
            return;
        }

        let dateStart = new Date()

        document.getElementById('progressBar').style.width = `${30}%`;
        document.getElementById('progressBar').textContent = `[${dateStart.toLocaleString()}]Waiting... `;

        if (!Array.isArray(ipOrIps)) {
            ipOrIps = [ipOrIps];
        }
        fetch('/execute-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ips: ipOrIps, command: userCommand, username: userName, userpass: userPwd })
        })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            data.forEach(result => {
                const block = document.createElement('div');
                block.className = 'result-block';
                const ipTimeParagraph = document.createElement('p');
                ipTimeParagraph.innerHTML =
                    `<strong>IP: ${result.ip} - Executed at: ${dateStart.toLocaleString()} - Cmd: ${userCommand} </strong>`;
                const outputParagraph = document.createElement('pre');
                outputParagraph.textContent = `${result.output}`;
                block.appendChild(ipTimeParagraph);
                block.appendChild(outputParagraph);
                resultDiv.appendChild(block);
            });

            let dateEnd = new Date()
            const duration = dateEnd - dateStart; // in milliseconds
            document.getElementById('progressBar').style.width = `${100}%`;
            document.getElementById('progressBar').textContent =
                document.getElementById('progressBar').textContent + `[${dateEnd.toLocaleString()}]Finish... ` + `Cost: ${duration}ms`;
        })
        .catch(error => console.error('Error:', error));
    }
    function clearResults() {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = ''; // Clear all content in the result div
    }

    function preCmd1() {
        const userCommandInput = document.getElementById('userCommand');
        userCommandInput.value = "date"
    }
    function preCmd2() {
        const userCommandInput = document.getElementById('userCommand');
        userCommandInput.value = "cat /etc/ssh/sshd_config"
    }
    function preCmd3() {
        const userCommandInput = document.getElementById('userCommand');
        userCommandInput.value = "cmd3"
    }
    function preCmd4() {
        const userCommandInput = document.getElementById('userCommand');
        userCommandInput.value = "cmd4"
    }
    function preCmd5() {
        const userCommandInput = document.getElementById('userCommand');
        userCommandInput.value = "cmd5"
    }
    function preCmd6() {
        const userCommandInput = document.getElementById('userCommand');
        userCommandInput.value = "cmd6"
    }

    function preUser1() {
        const userNameInput = document.getElementById('user_name');
        const userPwdInput = document.getElementById('user_pwd');
        userNameInput.value = "root"
        userPwdInput.value = "guowb"
    }
    function preUser2() {
        const userNameInput = document.getElementById('user_name');
        const userPwdInput = document.getElementById('user_pwd');
        userNameInput.value = "user2"
        userPwdInput.value = "pwd1"
    }
    function preUser3() {
        const userNameInput = document.getElementById('user_name');
        const userPwdInput = document.getElementById('user_pwd');
        userNameInput.value = "user3"
        userPwdInput.value = "pwd1"
    }
    function preUser4() {
        const userNameInput = document.getElementById('user_name');
        const userPwdInput = document.getElementById('user_pwd');
        userNameInput.value = "user4"
        userPwdInput.value = "pwd1"
    }
