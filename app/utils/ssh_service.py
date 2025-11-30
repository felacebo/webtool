"""SSH服务工具类 - 提供远程连接和命令执行功能"""
import paramiko


class SSHService:
    """SSH服务类，处理远程连接和命令执行"""
    
    def __init__(self, timeout=10, port=22):
        """
        初始化SSH服务
        
        Args:
            timeout: 连接超时时间（秒）
            port: SSH端口，默认22
        """
        self.timeout = timeout
        self.port = port
    
    def execute_command(self, ip, username, password, command):
        """
        在远程主机上执行命令
        
        Args:
            ip: 目标IP地址
            username: SSH用户名
            password: SSH密码
            command: 要执行的命令
            
        Returns:
            dict: 包含IP和执行结果的字典
        """
        try:
            # 初始化SSH客户端
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(
                hostname=ip,
                port=self.port,
                username=username,
                password=password,
                timeout=self.timeout
            )
            
            # 执行命令
            stdin, stdout, stderr = client.exec_command(command)
            result = stdout.read().decode('utf-8')
            error = stderr.read().decode('utf-8')
            
            # 关闭SSH连接
            client.close()
            
            # 返回结果
            output = error if error else result
            return {'ip': ip, 'output': output}
            
        except Exception as e:
            return {'ip': ip, 'output': str(e)}