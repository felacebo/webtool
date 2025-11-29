"""应用配置文件"""


class Config:
    """基础配置类"""
    # 基本配置
    SECRET_KEY = 'your-secret-key-here'
    DEBUG = True
    
    # SSH连接配置
    SSH_TIMEOUT = 10
    SSH_PORT = 22
    
    # 其他配置
    JSON_AS_ASCII = False
