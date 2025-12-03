// 环境配置页面专用JavaScript

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

// 解析IP地址的后端函数
function parseIPsBackEnd() {
    const ipInput = document.getElementById('ipInput');
    const text = ipInput.value;
    const extractedIPs = extractIPs(text);
    
    // 显示解析出的IP
    displayParsedIPs(extractedIPs);
}

// 显示解析出的IP到指定区域
function displayParsedIPs(ips) {
    const parsedIPsContainer = document.getElementById('parsedIPs');
    parsedIPsContainer.innerHTML = '';
    
    if (ips.length > 0) {
        // 显示最多5个IP
        const maxIPsToShow = 5;
        const displayIPs = ips.slice(0, maxIPsToShow);
        
        displayIPs.forEach(ip => {
            const ipItem = document.createElement('div');
            ipItem.className = 'parsed-ip-item';
            ipItem.textContent = ip;
            parsedIPsContainer.appendChild(ipItem);
        });
        
        // 如果有超过5个IP，显示提示
        if (ips.length > maxIPsToShow) {
            const moreIPsMessage = document.createElement('div');
            moreIPsMessage.style.fontSize = '0.8rem';
            moreIPsMessage.style.color = '#666';
            moreIPsMessage.style.marginTop = '8px';
            moreIPsMessage.style.textAlign = 'center';
            moreIPsMessage.textContent = `共${ips.length}个IP，仅显示前${maxIPsToShow}个`;
            parsedIPsContainer.appendChild(moreIPsMessage);
        }
    } else {
        // 如果没有提取到IP，显示提示信息
        const noIPMessage = document.createElement('p');
        noIPMessage.textContent = '未提取到有效IP地址';
        noIPMessage.style.color = '#666';
        noIPMessage.style.fontStyle = 'italic';
        parsedIPsContainer.appendChild(noIPMessage);
    }
}

// 执行所有命令
function executeAllCommands() {
    const ipInput = document.getElementById('ipInput');
    const text = ipInput.value;
    let ips = extractIPs(text);

    if (ips.length === 0) {
        alert('请先解析IP地址');
        return;
    }

    // 最多执行5个IP
    const maxIPsToExecute = 5;
    ips = ips.slice(0, maxIPsToExecute);
    executeCommand(ips);
}

// 执行命令核心函数
function executeCommand(ipOrIps) {
    let userCommand = document.getElementById('userCommand').value;
    if (!userCommand) {
        alert('请输入要执行的命令');
        return;
    }

    let userName = document.getElementById('user_name').value;
    let userPwd = document.getElementById('user_pwd').value;
    if (!userName || !userPwd) {
        alert('请输入用户名和密码');
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
                `<strong>IP: ${result.ip} - 执行时间: ${dateStart.toLocaleString()} - 命令: ${userCommand} </strong>`;
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
            document.getElementById('progressBar').textContent + `[${dateEnd.toLocaleString()}]完成... ` + `耗时: ${duration}ms`;
    })
    .catch(error => {
        console.error('执行命令出错:', error);
        document.getElementById('progressBar').style.width = `${100}%`;
        document.getElementById('progressBar').textContent = `执行出错: ${error.message}`;
    });
}

// 清空输入和结果
function clearInputs() {
    document.getElementById('ipInput').value = '';
    document.getElementById('user_name').value = '';
    document.getElementById('user_pwd').value = '';
    document.getElementById('parsedIPs').innerHTML = '';
    
    // 清空结果
    const result = document.getElementById('result');
    result.innerHTML = '';
    
    // 清空进度条
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressBar').textContent = '';
}

// 清空结果
function clearResults() {
    const result = document.getElementById('result');
    result.innerHTML = '';
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    console.log('EnvConfig JS loaded');
});
