"""Quick Config模块初始化"""
from .routes import quick_config_bp, env_config_bp, biz_config_bp
from .services import QuickConfigService

__all__ = ['quick_config_bp', 'env_config_bp', 'biz_config_bp', 'QuickConfigService']