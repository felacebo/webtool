"""测试模块路由"""
from flask import Blueprint, render_template

# 创建蓝图
test_bp = Blueprint(
    'test',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/test/static'
)


@test_bp.route('/to_test')
def test_page():
    """测试页面"""
    return render_template('test.html')
