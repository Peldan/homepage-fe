(this["webpackJsonphomepage-ts"]=this["webpackJsonphomepage-ts"]||[]).push([[0],{86:function(e,t,a){e.exports=a(96)},94:function(e,t,a){},96:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(31),l=a.n(s),o=a(23),i=a(24),c=a(14),u=a(27),h=a(28),d=a(78),m=a(63),p=a(84),g=a(59),f=a(106),v=a(35),b=a(104),y=a(101),E=a(103),S=a(105),w=a(82),O=a(81),k=[{title:"Aftonbladet",url:"https://rss.aftonbladet.se/rss2/small/pages/sections/nyheter/  "},{title:"SVT Nyheter",url:"http://www.svt.se/nyheter/rss.xml"},{title:"SvD",url:"http://www.svd.se/?service=rss"},{title:"Dagens Industri",url:"https://digital.di.se/rss"}],j=a(48),C=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={url:""},n.handleInput=n.handleInput.bind(Object(c.a)(n)),n}return Object(i.a)(a,[{key:"handleInput",value:function(e){this.setState({url:e.target.value})}},{key:"render",value:function(){var e=this,t=k.map((function(t){return r.a.createElement(j.a,{onClick:function(){return e.props.onConfirm(t.url)}},t.title)}));return r.a.createElement(b.a,{show:this.props.isOpen,onHide:this.props.onClose},r.a.createElement(b.a.Header,{closeButton:!0},r.a.createElement(b.a.Title,null,this.props.title)),r.a.createElement(b.a.Body,null,r.a.createElement(w.a,{defaultActiveKey:"preset",id:"modal-tabs"},r.a.createElement(y.a,{eventKey:"preset",title:"Preset"},r.a.createElement(O.a,{variant:"primary",className:"mt-4",id:"dropdown-basic-button",title:"V\xe4lj nyhetssida"},t)),r.a.createElement(y.a,{eventKey:"custom",title:"Custom"},r.a.createElement("label",{className:"mt-3",htmlFor:"basic-url"},"RSS URL"),r.a.createElement(E.a,{className:"mb-3"},r.a.createElement(S.a,{onChange:this.handleInput,id:"basic-url"}))))),r.a.createElement(b.a.Footer,null,r.a.createElement(v.a,{variant:"secondary",onClick:this.props.onClose},"Close"),r.a.createElement(v.a,{variant:"primary",disabled:this.state.url.length>5,onClick:function(){return e.props.onConfirm(e.state.url)}},"Save changes")))}}]),a}(r.a.Component);function N(e){return!e||new Date(e).getMilliseconds()-Date.now()>3e5}var M=a(60),P=a(61);var R=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={showModal:!1,rssFeed:[],currentlyViewing:[],amountOfPages:0,activePage:1,lastUpdated:void 0,url:"",fetching:!1},n.openModal=n.openModal.bind(Object(c.a)(n)),n.closeModal=n.closeModal.bind(Object(c.a)(n)),n.clearData=n.clearData.bind(Object(c.a)(n)),n.getRSSFeed=n.getRSSFeed.bind(Object(c.a)(n)),n.populatePage=n.populatePage.bind(Object(c.a)(n)),n}return Object(i.a)(a,[{key:"openModal",value:function(){this.setState({showModal:!0})}},{key:"closeModal",value:function(){this.setState({showModal:!1})}},{key:"clearData",value:function(){this.setState({showModal:!1,rssFeed:[],currentlyViewing:[],amountOfPages:0,activePage:1,lastUpdated:void 0,url:"",fetching:!1}),localStorage.setItem(String(this.props.id),JSON.stringify({}))}},{key:"getRSSFeed",value:function(e){var t=this;this.closeModal(),this.setState({fetching:!0}),fetch("https://homepage-be.herokuapp.com/rss",{method:"POST",body:e}).then((function(e){return e.json()})).then((function(a){var n=new Date;t.setState({rssFeed:a,amountOfPages:Math.ceil(a.length/3),lastUpdated:n,url:e,fetching:!1},(function(){var r={rssFeed:a,lastUpdated:n,url:e};localStorage.setItem(String(t.props.id),JSON.stringify(r)),t.populatePage(1)}))}))}},{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem(String(this.props.id));if(t){var a=JSON.parse(t);console.log(a),a.lastUpdated&&a.url&&a.url.length>5&&N(a.lastUpdated)?this.getRSSFeed(a.url):this.setState((function(e){return Object(p.a)({},e,{},a)}),(function(){e.setState({amountOfPages:Math.ceil(e.state.rssFeed.length/3)},(function(){e.populatePage(1)}))}))}}},{key:"populatePage",value:function(e){var t,a=Math.floor(this.state.rssFeed.length/this.state.amountOfPages),n=this.state.rssFeed.length%this.state.amountOfPages;t=e>=this.state.amountOfPages-n?(a+1)*(e-1):a*(e-1),console.log(this.state.rssFeed);try{this.setState({currentlyViewing:this.state.rssFeed.slice(t,t+3),activePage:e})}catch(r){localStorage.clear()}}},{key:"render",value:function(){for(var e=this,t=this.state.currentlyViewing.map((function(e){return r.a.createElement(g.a,{key:e.url,className:"border-0"},r.a.createElement("h1",{className:"heading"},r.a.createElement("a",{href:e.url},e.title)),r.a.createElement(M.a,{src:e.imgUrl}),r.a.createElement("p",null,e.description))})),a=[],n=function(t){a.push(r.a.createElement(f.a.Item,{variant:"dark",key:t,active:e.state.activePage===t,onClick:function(){return e.populatePage(t)}},t))},s=1;s<=this.state.amountOfPages;s++)n(s);return r.a.createElement(g.a,null,r.a.createElement(g.a,{className:"card-body column-content border-0"},this.state.fetching?r.a.createElement(P.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")):r.a.createElement(r.a.Fragment,null,r.a.createElement(C,{title:"Add RSS feed",isOpen:this.state.showModal,onClose:this.closeModal,onConfirm:this.getRSSFeed}),t.length>0?t:r.a.createElement("h1",{className:"heading"},"Empty :("))),r.a.createElement(g.a,{className:"d-flex justify-content-between align-items-center border-0"},r.a.createElement(f.a,null,a),t.length>0?r.a.createElement(v.a,{className:"mb-2",variant:"danger",size:"sm",onClick:this.clearData},"Empty"):r.a.createElement(v.a,{className:"mb-2",variant:"light",size:"sm",onClick:this.openModal},"Add")))}}]),a}(r.a.Component),F=a(83),D=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement(F.a,{bg:"dark"},r.a.createElement("a",{className:"navbar-brand",href:"#"},"\u2302")))}}]),a}(r.a.Component),U=a(77);var I=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).symbol=void 0,n.state={currentWeather:{time:"",temperature:""},lastUpdated:void 0},n.checkWeather=n.checkWeather.bind(Object(c.a)(n)),n.symbol=Symbol(),n}return Object(i.a)(a,[{key:"checkWeather",value:function(){var e=this;if(this.props.location&&this.props.location.coords){var t=this.props.location.coords,a=Math.round(t.latitude*Math.pow(10,6))/Math.pow(10,6),n=Math.round(t.longitude*Math.pow(10,6))/Math.pow(10,6);fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"+n+"/lat/"+a+"/data.json",{method:"get"}).then((function(e){return e.json()})).then((function(t){var a=t.timeSeries[1],n=a.parameters[11].values[0];e.setState({currentWeather:{time:new Date(a.validTime).toDateString(),temperature:n}},(function(){var t={currentWeather:e.state.currentWeather,lastUpdated:new Date};localStorage.setItem(e.symbol.toString(),JSON.stringify(t))}))}))}}},{key:"componentDidUpdate",value:function(e){(e.location!==this.props.location||this.state.lastUpdated&&N(this.state.lastUpdated))&&this.checkWeather();var t=JSON.parse(localStorage.getItem(this.symbol.toString()));t&&t.lastUpdated&&(N(t.lastUpdated)?this.checkWeather():JSON.stringify(t.currentWeather)!=JSON.stringify(this.state.currentWeather)&&this.setState(t))}},{key:"render",value:function(){var e=this.state.currentWeather;return r.a.createElement("div",{className:"weather mb-3"},e.temperature?r.a.createElement("div",null,r.a.createElement(U.a,{className:"mb-1",src:"/homepage-fe/weather.png",fluid:!0}),r.a.createElement("p",null,r.a.createElement("b",null,"Temperature:"),e.temperature,"\xb0C")):r.a.createElement(P.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")))}}]),a}(r.a.Component),W=a(79);var J=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this,{})).state={rowCount:1,location:void 0},e.addRow=e.addRow.bind(Object(c.a)(e)),e.deleteRow=e.deleteRow.bind(Object(c.a)(e)),e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.setState({location:t})})),fetch("https://homepage-be.herokuapp.com/wakeup").then((function(e){return console.log("told backend to stop snoozing: "+e.status)}))}},{key:"addRow",value:function(){this.setState({rowCount:this.state.rowCount+1})}},{key:"deleteRow",value:function(){this.setState({rowCount:this.state.rowCount-1})}},{key:"buildCols",value:function(e,t){for(var a=[],n=1;n<=e;n++)a.push(r.a.createElement(R,{id:t*n}));return a}},{key:"buildRows",value:function(e){for(var t=[],a=1;a<=e;a++)t.push(this.buildCols(3,a));return t}},{key:"render",value:function(){var e=this.buildRows(this.state.rowCount);return r.a.createElement("div",null,r.a.createElement(D,null),r.a.createElement(m.a,{fluid:!0,className:"d-flex flex-column"},r.a.createElement(d.a,{className:"text-center",fluid:!0},r.a.createElement(m.a,null,r.a.createElement(I,{location:this.state.location}),r.a.createElement("h1",{className:"heading"},"Simply the best homepage in the world"),r.a.createElement(v.a,{className:"mx-1 my-2",color:"primary",onClick:this.addRow},"Add"),r.a.createElement(v.a,{className:"my-2",variant:"outline-secondary",onClick:this.deleteRow},"Delete")))),r.a.createElement(m.a,{className:"py-3 bg-light h-100"},r.a.createElement(W.a,null,e)))}}]),a}(r.a.Component);a(94),a(95);l.a.render(r.a.createElement(J,null),document.getElementById("root"))}},[[86,1,2]]]);
//# sourceMappingURL=main.ddbae2a1.chunk.js.map