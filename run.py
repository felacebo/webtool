"""
WebTool - 远程设备管理工具
应用入口文件
"""
from app import create_app

# 创建Flask应用实例
app = create_app()

if __name__ == '__main__':
    # 启动应用
    app.run(debug=True, host='0.0.0.0', port=5000)
