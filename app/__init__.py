from flask import Flask


def create_app():
    """创建Flask应用实例"""
    app = Flask(__name__, 
                template_folder='.',
                static_folder='.',
                static_url_path='')
    
    # 加载配置
    app.config.from_object('app.config.Config')
    
    # 注册各模块的蓝图
    from app.modules.home.routes import home_bp
    from app.modules.remote_access.routes import remote_access_bp
    from app.modules.quick_config import quick_config_bp, env_config_bp, biz_config_bp
    from app.modules.test.routes import test_bp
    
    app.register_blueprint(home_bp)
    app.register_blueprint(remote_access_bp)
    app.register_blueprint(quick_config_bp)
    app.register_blueprint(env_config_bp)
    app.register_blueprint(biz_config_bp)
    app.register_blueprint(test_bp)
    
    return app
