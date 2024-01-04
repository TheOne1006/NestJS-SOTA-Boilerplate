'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">example documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="请输入查询关键字"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>入门指南</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>概述
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>手册
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>依赖项
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>属性列表
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">模块列表</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppI18nModule.html" data-type="entity-link" >AppI18nModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-798ca7f8f9836b0c56d259039eff986bcc3af5ac6524d759ebbcb06365d731a7573ce28f12262e23991fd4bee3b6b542789e2dd6ff6c59c442d70505a66873e9"' : 'data-bs-target="#xs-controllers-links-module-AppModule-798ca7f8f9836b0c56d259039eff986bcc3af5ac6524d759ebbcb06365d731a7573ce28f12262e23991fd4bee3b6b542789e2dd6ff6c59c442d70505a66873e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-798ca7f8f9836b0c56d259039eff986bcc3af5ac6524d759ebbcb06365d731a7573ce28f12262e23991fd4bee3b6b542789e2dd6ff6c59c442d70505a66873e9"' :
                                            'id="xs-controllers-links-module-AppModule-798ca7f8f9836b0c56d259039eff986bcc3af5ac6524d759ebbcb06365d731a7573ce28f12262e23991fd4bee3b6b542789e2dd6ff6c59c442d70505a66873e9"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-4353cb0069c7308936a4d5f78fab4be4c6f0077bd3626e4c5e183bd0ee92c0f0539620befbe51536af76565996bcdccaa001037a904ab17fee99a03ed20639d4"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-4353cb0069c7308936a4d5f78fab4be4c6f0077bd3626e4c5e183bd0ee92c0f0539620befbe51536af76565996bcdccaa001037a904ab17fee99a03ed20639d4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-4353cb0069c7308936a4d5f78fab4be4c6f0077bd3626e4c5e183bd0ee92c0f0539620befbe51536af76565996bcdccaa001037a904ab17fee99a03ed20639d4"' :
                                        'id="xs-injectables-links-module-AuthModule-4353cb0069c7308936a4d5f78fab4be4c6f0077bd3626e4c5e183bd0ee92c0f0539620befbe51536af76565996bcdccaa001037a904ab17fee99a03ed20639d4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-609c5ea3081d653aead7c93f2b64512c56cd37b03305e0f9e2500e8beb4bd218a1edec3dd34fa2867667b89ec4cb6b5d274cddfd0f725d8bb33f53a769f65caa"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-609c5ea3081d653aead7c93f2b64512c56cd37b03305e0f9e2500e8beb4bd218a1edec3dd34fa2867667b89ec4cb6b5d274cddfd0f725d8bb33f53a769f65caa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-609c5ea3081d653aead7c93f2b64512c56cd37b03305e0f9e2500e8beb4bd218a1edec3dd34fa2867667b89ec4cb6b5d274cddfd0f725d8bb33f53a769f65caa"' :
                                            'id="xs-controllers-links-module-UsersModule-609c5ea3081d653aead7c93f2b64512c56cd37b03305e0f9e2500e8beb4bd218a1edec3dd34fa2867667b89ec4cb6b5d274cddfd0f725d8bb33f53a769f65caa"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-609c5ea3081d653aead7c93f2b64512c56cd37b03305e0f9e2500e8beb4bd218a1edec3dd34fa2867667b89ec4cb6b5d274cddfd0f725d8bb33f53a769f65caa"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-609c5ea3081d653aead7c93f2b64512c56cd37b03305e0f9e2500e8beb4bd218a1edec3dd34fa2867667b89ec4cb6b5d274cddfd0f725d8bb33f53a769f65caa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-609c5ea3081d653aead7c93f2b64512c56cd37b03305e0f9e2500e8beb4bd218a1edec3dd34fa2867667b89ec4cb6b5d274cddfd0f725d8bb33f53a769f65caa"' :
                                        'id="xs-injectables-links-module-UsersModule-609c5ea3081d653aead7c93f2b64512c56cd37b03305e0f9e2500e8beb4bd218a1edec3dd34fa2867667b89ec4cb6b5d274cddfd0f725d8bb33f53a769f65caa"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>类列表</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AnyExceptionsFilter.html" data-type="entity-link" >AnyExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/BadRequestFilter.html" data-type="entity-link" >BadRequestFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseExceptionsFilter.html" data-type="entity-link" >BaseExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>可注入的</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthMiddleware.html" data-type="entity-link" >AuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SerializerInterceptor.html" data-type="entity-link" >SerializerInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WrapResponceInterceptor.html" data-type="entity-link" >WrapResponceInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>路由守卫列表</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>接口</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IErrorData.html" data-type="entity-link" >IErrorData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExtendData.html" data-type="entity-link" >IExtendData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlainLiteralObject.html" data-type="entity-link" >PlainLiteralObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestUser.html" data-type="entity-link" >RequestUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>其他</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">函数</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">变量</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>文档概览</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        文档生成使用 <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});