"""快速配置路由"""
from flask import Blueprint, render_template, redirect, url_for

# 创建蓝图
quick_config_bp = Blueprint(
    'quick_config',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/quick_config/static'
)


@quick_config_bp.route('/to_quick_config')
def quick_config():
    """快速配置页面"""
    return render_template('quick_config.html')


@quick_config_bp.route('/to_quick_env_config')
def quick_env_config():
    """快速环境配置页面"""
    return redirect(url_for('quickconfig.quick_env_config'))


@quick_config_bp.route('/to_quick_business_config')
def quick_business_config():
    """快速业务配置页面"""
    return redirect(url_for('quickconfig.quick_business_config'))
