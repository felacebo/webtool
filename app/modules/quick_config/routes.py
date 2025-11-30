"""快速配置路由"""
from flask import Blueprint, render_template, request, jsonify, redirect, url_for
from .services import QuickConfigService

# 创建蓝图
quick_config_bp = Blueprint(
    'quick_config',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/quick_config/static'
)

# 环境配置蓝图
env_config_bp = Blueprint(
    'env_config',
    __name__,
    template_folder='env_config/templates',
    url_prefix='/quick_config'
)

# 业务配置蓝图
biz_config_bp = Blueprint(
    'biz_config',
    __name__,
    template_folder='biz_config/templates',
    url_prefix='/quick_config'
)


@quick_config_bp.route('/quick_config')
def index():
    """快速配置主页面"""
    return render_template('quick_config.html')


@env_config_bp.route('/quick_env_config')
def env_config():
    """快速环境配置页面"""
    return render_template('env_config.html')


@biz_config_bp.route('/quick_business_config')
def business_config():
    """快速业务配置页面"""
    return render_template('biz_config.html')


# 兼容旧路由的重定向
@quick_config_bp.route('/to_quick_config')
def to_quick_config():
    """重定向到快速配置页面（兼容旧链接）"""
    return redirect(url_for('quick_config.index'))


@quick_config_bp.route('/to_quick_env_config')
def to_quick_env_config():
    """重定向到快速环境配置页面（兼容旧链接）"""
    return redirect(url_for('env_config.env_config'))


@quick_config_bp.route('/to_quick_business_config')
def to_quick_business_config():
    """重定向到快速业务配置页面（兼容旧链接）"""
    return redirect(url_for('biz_config.business_config'))


# API 路由
@quick_config_bp.route('/api/env_config/options', methods=['GET'])
def get_env_config_options():
    """获取环境配置选项"""
    try:
        options = QuickConfigService.get_env_config_options()
        return jsonify({'success': True, 'data': options})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@quick_config_bp.route('/api/business_config/options', methods=['GET'])
def get_business_config_options():
    """获取业务配置选项"""
    try:
        options = QuickConfigService.get_business_config_options()
        return jsonify({'success': True, 'data': options})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@quick_config_bp.route('/api/env_config', methods=['POST'])
def save_env_config():
    """保存环境配置"""
    try:
        config_data = request.get_json()
        
        # 验证配置数据
        is_valid, error_msg = QuickConfigService.validate_config(config_data, 'env')
        if not is_valid:
            return jsonify({'success': False, 'message': error_msg}), 400
        
        # 保存配置
        result = QuickConfigService.save_env_config(config_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@quick_config_bp.route('/api/business_config', methods=['POST'])
def save_business_config():
    """保存业务配置"""
    try:
        config_data = request.get_json()
        
        # 验证配置数据
        is_valid, error_msg = QuickConfigService.validate_config(config_data, 'business')
        if not is_valid:
            return jsonify({'success': False, 'message': error_msg}), 400
        
        # 保存配置
        result = QuickConfigService.save_business_config(config_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
