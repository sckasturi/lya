import{r as a,a as H}from"./react-vendor-DXv7Z-GT.js";var y=function(n,t){return y=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,e){o.__proto__=e}||function(o,e){for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(o[l]=e[l])},y(n,t)};function d(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");y(n,t);function o(){this.constructor=n}n.prototype=t===null?Object.create(t):(o.prototype=t.prototype,new o)}var s=function(){return s=Object.assign||function(t){for(var o,e=1,l=arguments.length;e<l;e++){o=arguments[e];for(var c in o)Object.prototype.hasOwnProperty.call(o,c)&&(t[c]=o[c])}return t},s.apply(this,arguments)};function $(n,t){t===void 0&&(t={});var o=t.insertAt;if(!(typeof document>"u")){var e=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css",o==="top"&&e.firstChild?e.insertBefore(l,e.firstChild):e.appendChild(l),l.styleSheet?l.styleSheet.cssText=n:l.appendChild(document.createTextNode(n))}}var q=`/*
  code is extracted from Calendly's embed stylesheet: https://assets.calendly.com/assets/external/widget.css
*/

.calendly-inline-widget,
.calendly-inline-widget *,
.calendly-badge-widget,
.calendly-badge-widget *,
.calendly-overlay,
.calendly-overlay * {
    font-size:16px;
    line-height:1.2em
}

.calendly-inline-widget iframe,
.calendly-badge-widget iframe,
.calendly-overlay iframe {
    display:inline;
    width:100%;
    height:100%
}

.calendly-popup-content {
    position:relative
}

.calendly-popup-content.calendly-mobile {
    -webkit-overflow-scrolling:touch;
    overflow-y:auto
}

.calendly-overlay {
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow:hidden;
    z-index:9999;
    background-color:#a5a5a5;
    background-color:rgba(31,31,31,0.4)
}

.calendly-overlay .calendly-close-overlay {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0
}

.calendly-overlay .calendly-popup {
    box-sizing:border-box;
    position:absolute;
    top:50%;
    left:50%;
    -webkit-transform:translateY(-50%) translateX(-50%);
    transform:translateY(-50%) translateX(-50%);
    width:80%;
    min-width:900px;
    max-width:1000px;
    height:90%;
    max-height:680px
}

@media (max-width: 975px) {
    .calendly-overlay .calendly-popup {
        position:fixed;
        top:50px;
        left:0;
        right:0;
        bottom:0;
        -webkit-transform:none;
        transform:none;
        width:100%;
        height:auto;
        min-width:0;
        max-height:none
    }
}

.calendly-overlay .calendly-popup .calendly-popup-content {
    height:100%;
}

.calendly-overlay .calendly-popup-close {
    position:absolute;
    top:25px;
    right:25px;
    color:#fff;
    width:19px;
    height:19px;
    cursor:pointer;
    background:url(https://assets.calendly.com/assets/external/close-icon.svg) no-repeat;
    background-size:contain
}

@media (max-width: 975px) {
    .calendly-overlay .calendly-popup-close {
        top:15px;
        right:15px
    }
}

.calendly-badge-widget {
    position:fixed;
    right:20px;
    bottom:15px;
    z-index:9998
}

.calendly-badge-widget .calendly-badge-content {
    display:table-cell;
    width:auto;
    height:45px;
    padding:0 30px;
    border-radius:25px;
    box-shadow:rgba(0,0,0,0.25) 0 2px 5px;
    font-family:sans-serif;
    text-align:center;
    vertical-align:middle;
    font-weight:bold;
    font-size:14px;
    color:#fff;
    cursor:pointer
}

.calendly-badge-widget .calendly-badge-content.calendly-white {
    color:#666a73
}

.calendly-badge-widget .calendly-badge-content span {
    display:block;
    font-size:12px
}

.calendly-spinner {
    position:absolute;
    top:50%;
    left:0;
    right:0;
    -webkit-transform:translateY(-50%);
    transform:translateY(-50%);
    text-align:center;
    z-index:-1
}

.calendly-spinner>div {
    display:inline-block;
    width:18px;
    height:18px;
    background-color:#e1e1e1;
    border-radius:50%;
    vertical-align:middle;
    -webkit-animation:calendly-bouncedelay 1.4s infinite ease-in-out;
    animation:calendly-bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode:both;
    animation-fill-mode:both
}

.calendly-spinner .calendly-bounce1 {
    -webkit-animation-delay:-0.32s;
    animation-delay:-0.32s
}

.calendly-spinner .calendly-bounce2 {
    -webkit-animation-delay:-0.16s;
    animation-delay:-0.16s
}

@-webkit-keyframes calendly-bouncedelay {
    0%,80%,100% {
        -webkit-transform:scale(0);
        transform:scale(0)
    } 
    
    40%{
        -webkit-transform:scale(1);
        transform:scale(1)
    }
}

@keyframes calendly-bouncedelay{ 
    0%,80%,100% {
        -webkit-transform:scale(0);
        transform:scale(0)
    }
    
    40% {
        -webkit-transform:scale(1);
        transform:scale(1)
    }
}`;$(q);function m(n){return n.charAt(0)==="#"?n.slice(1):n}function Q(n){return n?.primaryColor&&(n.primaryColor=m(n.primaryColor)),n?.textColor&&(n.textColor=m(n.textColor)),n?.backgroundColor&&(n.backgroundColor=m(n.backgroundColor)),n}var D;(function(n){n.PROFILE_PAGE_VIEWED="calendly.profile_page_viewed",n.EVENT_TYPE_VIEWED="calendly.event_type_viewed",n.DATE_AND_TIME_SELECTED="calendly.date_and_time_selected",n.EVENT_SCHEDULED="calendly.event_scheduled",n.PAGE_HEIGHT="calendly.page_height"})(D||(D={}));var A=function(n){var t=n.url,o=n.prefill,e=o===void 0?{}:o,l=n.pageSettings,c=l===void 0?{}:l,f=n.utm,i=f===void 0?{}:f,h=n.embedType,r=Q(c),g=r.backgroundColor,j=r.hideEventTypeDetails,B=r.hideLandingPageDetails,b=r.primaryColor,v=r.textColor,W=r.hideGdprBanner,C=e.customAnswers,p=e.date,x=e.email,E=e.firstName,w=e.guests,_=e.lastName,k=e.location,S=e.smsReminderNumber,L=e.name,N=i.utmCampaign,I=i.utmContent,T=i.utmMedium,P=i.utmSource,O=i.utmTerm,R=i.salesforce_uuid,u=t.indexOf("?"),U=u>-1,Y=t.slice(u+1),F=U?t.slice(0,u):t,G=[U?Y:null,g?"background_color=".concat(g):null,j?"hide_event_type_details=1":null,B?"hide_landing_page_details=1":null,b?"primary_color=".concat(b):null,v?"text_color=".concat(v):null,W?"hide_gdpr_banner=1":null,L?"name=".concat(encodeURIComponent(L)):null,S?"phone_number=".concat(encodeURIComponent(S)):null,k?"location=".concat(encodeURIComponent(k)):null,E?"first_name=".concat(encodeURIComponent(E)):null,_?"last_name=".concat(encodeURIComponent(_)):null,w?"guests=".concat(w.map(encodeURIComponent).join(",")):null,x?"email=".concat(encodeURIComponent(x)):null,p&&p instanceof Date?"date=".concat(X(p)):null,N?"utm_campaign=".concat(encodeURIComponent(N)):null,I?"utm_content=".concat(encodeURIComponent(I)):null,T?"utm_medium=".concat(encodeURIComponent(T)):null,P?"utm_source=".concat(encodeURIComponent(P)):null,O?"utm_term=".concat(encodeURIComponent(O)):null,R?"salesforce_uuid=".concat(encodeURIComponent(R)):null,h?"embed_type=".concat(h):null,"embed_domain=1"].concat(C?K(C):[]).filter(function(V){return V!==null}).join("&");return"".concat(F,"?").concat(G)},X=function(n){var t=n.getMonth()+1,o=n.getDate(),e=n.getFullYear();return[e,t<10?"0".concat(t):t,o<10?"0".concat(o):o].join("-")},J=/^a\d{1,2}$/,K=function(n){var t=Object.keys(n).filter(function(o){return o.match(J)});return t.length?t.map(function(o){return"".concat(o,"=").concat(encodeURIComponent(n[o]))}):[]},M=function(n){d(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.render=function(){return a.createElement("div",{className:"calendly-spinner"},a.createElement("div",{className:"calendly-bounce1"}),a.createElement("div",{className:"calendly-bounce2"}),a.createElement("div",{className:"calendly-bounce3"}))},t}(a.Component),Z={minWidth:"320px",height:"630px"},tn=function(n){d(t,n);function t(o){var e=n.call(this,o)||this;return e.state={isLoading:!0},e.onLoad=e.onLoad.bind(e),e}return t.prototype.onLoad=function(){this.setState({isLoading:!1})},t.prototype.render=function(){var o=A({url:this.props.url,pageSettings:this.props.pageSettings,prefill:this.props.prefill,utm:this.props.utm,embedType:"Inline"}),e=this.props.LoadingSpinner||M;return a.createElement("div",{className:"calendly-inline-widget",style:this.props.styles||Z},this.state.isLoading&&a.createElement(e,null),a.createElement("iframe",{width:"100%",height:"100%",frameBorder:"0",title:this.props.iframeTitle||"Calendly Scheduling Page",onLoad:this.onLoad,src:o}))},t}(a.Component),nn=function(n){d(t,n);function t(o){var e=n.call(this,o)||this;return e.state={isLoading:!0},e.onLoad=e.onLoad.bind(e),e}return t.prototype.onLoad=function(){this.setState({isLoading:!1})},t.prototype.render=function(){var o=A({url:this.props.url,pageSettings:this.props.pageSettings,prefill:this.props.prefill,utm:this.props.utm,embedType:"Inline"}),e=this.props.LoadingSpinner||M;return a.createElement(a.Fragment,null,this.state.isLoading&&a.createElement(e,null),a.createElement("iframe",{width:"100%",height:"100%",frameBorder:"0",title:this.props.iframeTitle||"Calendly Scheduling Page",onLoad:this.onLoad,src:o}))},t}(a.Component),z=function(n){if(!n.open)return null;if(!n.rootElement)throw new Error("[react-calendly]: PopupModal rootElement property cannot be undefined");return H.createPortal(a.createElement("div",{className:"calendly-overlay"},a.createElement("div",{onClick:n.onModalClose,className:"calendly-close-overlay"}),a.createElement("div",{className:"calendly-popup"},a.createElement("div",{className:"calendly-popup-content"},a.createElement(nn,s({},n)))),a.createElement("button",{className:"calendly-popup-close",onClick:n.onModalClose,"aria-label":"Close modal",style:{display:"block",border:"none",padding:0}})),n.rootElement)};(function(n){d(t,n);function t(o){var e=n.call(this,o)||this;return e.state={isOpen:!1},e.onClick=e.onClick.bind(e),e.onClose=e.onClose.bind(e),e}return t.prototype.onClick=function(o){o.preventDefault(),this.setState({isOpen:!0})},t.prototype.onClose=function(o){o.stopPropagation(),this.setState({isOpen:!1})},t.prototype.render=function(){return a.createElement(a.Fragment,null,a.createElement("button",{onClick:this.onClick,style:this.props.styles||{},className:this.props.className||""},this.props.text),a.createElement(z,s({},this.props,{open:this.state.isOpen,onModalClose:this.onClose,rootElement:this.props.rootElement})))},t})(a.Component);(function(n){d(t,n);function t(o){var e=n.call(this,o)||this;return e.state={isOpen:!1},e.onClick=e.onClick.bind(e),e.onClose=e.onClose.bind(e),e}return t.prototype.onClick=function(){this.setState({isOpen:!0})},t.prototype.onClose=function(o){o.stopPropagation(),this.setState({isOpen:!1})},t.prototype.render=function(){return a.createElement("div",{className:"calendly-badge-widget",onClick:this.onClick},a.createElement("div",{className:"calendly-badge-content",style:{background:this.props.color||"#00a2ff",color:this.props.textColor||"#ffffff"}},this.props.text||"Schedule time with me",this.props.branding&&a.createElement("span",null,"powered by Calendly")),a.createElement(z,s({},this.props,{open:this.state.isOpen,onModalClose:this.onClose,rootElement:this.props.rootElement})))},t})(a.Component);export{tn as I};
//# sourceMappingURL=calendly-DAKuLoTp.js.map
