"""环境配置路由"""
from flask import Blueprint, render_template

# 创建蓝图 - 整合到quickconfig下
quickconfig_bp = Blueprint(
    'quickconfig',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/quick_config/static'
)


@quickconfig_bp.route('/quick_env_config')
def quick_env_config():
    """快速环境配置页面"""
    return render_template('env_config.html')