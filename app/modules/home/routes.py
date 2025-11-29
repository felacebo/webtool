"""首页路由"""
from flask import Blueprint, render_template

# 创建蓝图
home_bp = Blueprint(
    'home',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/home/static'
)


@home_bp.route('/')
def index():
    """首页"""
    return render_template('index.html')
