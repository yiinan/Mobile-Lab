

/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution. 
 *
 * The Eclipse Public License is available at 
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at 
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/
"undefined"==typeof Paho&&(Paho={}),Paho.MQTT=function(e){function t(e,t){var s=t,n=e[t],o=n>>4,r=n&=15
t+=1
var a,h=0,d=1
do{if(t==e.length)return[null,s]
a=e[t++],h+=(127&a)*d,d*=128}while(0!=(128&a))
var f=t+h
if(f>e.length)return[null,s]
var g=new v(o)
switch(o){case u.CONNACK:var l=e[t++]
1&l&&(g.sessionPresent=!0),g.returnCode=e[t++]
break
case u.PUBLISH:var _=r>>1&3,p=i(e,t)
t+=2
var I=c(e,t,p)
t+=p,_>0&&(g.messageIdentifier=i(e,t),t+=2)
var w=new Paho.MQTT.Message(e.subarray(t,f))
1==(1&r)&&(w.retained=!0),8==(8&r)&&(w.duplicate=!0),w.qos=_,w.destinationName=I,g.payloadMessage=w
break
case u.PUBACK:case u.PUBREC:case u.PUBREL:case u.PUBCOMP:case u.UNSUBACK:g.messageIdentifier=i(e,t)
break
case u.SUBACK:g.messageIdentifier=i(e,t),t+=2,g.returnCode=e.subarray(t,f)}return[g,f]}function s(e,t,s){return t[s++]=e>>8,t[s++]=e%256,s}function n(e,t,n,i){return i=s(t,n,i),a(e,n,i),i+t}function i(e,t){return 256*e[t]+e[t+1]}function o(e){var t=new Array(1),s=0
do{var n=e%128
e>>=7,e>0&&(n|=128),t[s++]=n}while(e>0&&4>s)
return t}function r(e){for(var t=0,s=0;s<e.length;s++){var n=e.charCodeAt(s)
n>2047?(n>=55296&&56319>=n&&(s++,t++),t+=3):n>127?t+=2:t++}return t}function a(e,t,s){for(var n=s,i=0;i<e.length;i++){var o=e.charCodeAt(i)
if(o>=55296&&56319>=o){var r=e.charCodeAt(++i)
if(isNaN(r))throw new Error(_(g.MALFORMED_UNICODE,[o,r]))
o=(o-55296<<10)+(r-56320)+65536}127>=o?t[n++]=o:2047>=o?(t[n++]=o>>6&31|192,t[n++]=63&o|128):65535>=o?(t[n++]=o>>12&15|224,t[n++]=o>>6&63|128,t[n++]=63&o|128):(t[n++]=o>>18&7|240,t[n++]=o>>12&63|128,t[n++]=o>>6&63|128,t[n++]=63&o|128)}return t}function c(e,t,s){for(var n,i="",o=t;t+s>o;){var r=e[o++]
if(128>r)n=r
else{var a=e[o++]-128
if(0>a)throw new Error(_(g.MALFORMED_UTF,[r.toString(16),a.toString(16),""]))
if(224>r)n=64*(r-192)+a
else{var c=e[o++]-128
if(0>c)throw new Error(_(g.MALFORMED_UTF,[r.toString(16),a.toString(16),c.toString(16)]))
if(240>r)n=4096*(r-224)+64*a+c
else{var h=e[o++]-128
if(0>h)throw new Error(_(g.MALFORMED_UTF,[r.toString(16),a.toString(16),c.toString(16),h.toString(16)]))
if(!(248>r))throw new Error(_(g.MALFORMED_UTF,[r.toString(16),a.toString(16),c.toString(16),h.toString(16)]))
n=262144*(r-240)+4096*a+64*c+h}}}n>65535&&(n-=65536,i+=String.fromCharCode(55296+(n>>10)),n=56320+(1023&n)),i+=String.fromCharCode(n)}return i}var h="@VERSION@",u={CONNECT:1,CONNACK:2,PUBLISH:3,PUBACK:4,PUBREC:5,PUBREL:6,PUBCOMP:7,SUBSCRIBE:8,SUBACK:9,UNSUBSCRIBE:10,UNSUBACK:11,PINGREQ:12,PINGRESP:13,DISCONNECT:14},d=function(e,t){for(var s in e)if(e.hasOwnProperty(s)){if(!t.hasOwnProperty(s)){var n="Unknown property, "+s+". Valid properties are:"
for(var s in t)t.hasOwnProperty(s)&&(n=n+" "+s)
throw new Error(n)}if(typeof e[s]!==t[s])throw new Error(_(g.INVALID_TYPE,[typeof e[s],s]))}},f=function(e,t){return function(){return e.apply(t,arguments)}},g={OK:{code:0,text:"AMQJSC0000I OK."},CONNECT_TIMEOUT:{code:1,text:"AMQJSC0001E Connect timed out."},SUBSCRIBE_TIMEOUT:{code:2,text:"AMQJS0002E Subscribe timed out."},UNSUBSCRIBE_TIMEOUT:{code:3,text:"AMQJS0003E Unsubscribe timed out."},PING_TIMEOUT:{code:4,text:"AMQJS0004E Ping timed out."},INTERNAL_ERROR:{code:5,text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},CONNACK_RETURNCODE:{code:6,text:"AMQJS0006E Bad Connack return code:{0} {1}."},SOCKET_ERROR:{code:7,text:"AMQJS0007E Socket error:{0}."},SOCKET_CLOSE:{code:8,text:"AMQJS0008I Socket closed."},MALFORMED_UTF:{code:9,text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},UNSUPPORTED:{code:10,text:"AMQJS0010E {0} is not supported by this browser."},INVALID_STATE:{code:11,text:"AMQJS0011E Invalid state {0}."},INVALID_TYPE:{code:12,text:"AMQJS0012E Invalid type {0} for {1}."},INVALID_ARGUMENT:{code:13,text:"AMQJS0013E Invalid argument {0} for {1}."},UNSUPPORTED_OPERATION:{code:14,text:"AMQJS0014E Unsupported operation."},INVALID_STORED_DATA:{code:15,text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},INVALID_MQTT_MESSAGE_TYPE:{code:16,text:"AMQJS0016E Invalid MQTT message type {0}."},MALFORMED_UNICODE:{code:17,text:"AMQJS0017E Malformed Unicode string:{0} {1}."}},l={0:"Connection Accepted",1:"Connection Refused: unacceptable protocol version",2:"Connection Refused: identifier rejected",3:"Connection Refused: server unavailable",4:"Connection Refused: bad user name or password",5:"Connection Refused: not authorized"},_=function(e,t){var s=e.text
if(t)for(var n,i,o=0;o<t.length;o++)if(n="{"+o+"}",i=s.indexOf(n),i>0){var r=s.substring(0,i),a=s.substring(i+n.length)
s=r+t[o]+a}return s},p=[0,6,77,81,73,115,100,112,3],I=[0,4,77,81,84,84,4],v=function(e,t){this.type=e
for(var s in t)t.hasOwnProperty(s)&&(this[s]=t[s])}
v.prototype.encode=function(){var e=(15&this.type)<<4,t=0,i=new Array,a=0
switch(void 0!=this.messageIdentifier&&(t+=2),this.type){case u.CONNECT:switch(this.mqttVersion){case 3:t+=p.length+3
break
case 4:t+=I.length+3}if(t+=r(this.clientId)+2,void 0!=this.willMessage){t+=r(this.willMessage.destinationName)+2
var c=this.willMessage.payloadBytes
c instanceof Uint8Array||(c=new Uint8Array(d)),t+=c.byteLength+2}void 0!=this.userName&&(t+=r(this.userName)+2),void 0!=this.password&&(t+=r(this.password)+2)
break
case u.SUBSCRIBE:e|=2
for(var h=0;h<this.topics.length;h++)i[h]=r(this.topics[h]),t+=i[h]+2
t+=this.requestedQos.length
break
case u.UNSUBSCRIBE:e|=2
for(var h=0;h<this.topics.length;h++)i[h]=r(this.topics[h]),t+=i[h]+2
break
case u.PUBREL:e|=2
break
case u.PUBLISH:this.payloadMessage.duplicate&&(e|=8),e=e|=this.payloadMessage.qos<<1,this.payloadMessage.retained&&(e|=1),a=r(this.payloadMessage.destinationName),t+=a+2
var d=this.payloadMessage.payloadBytes
t+=d.byteLength,d instanceof ArrayBuffer?d=new Uint8Array(d):d instanceof Uint8Array||(d=new Uint8Array(d.buffer))
break
case u.DISCONNECT:}var f=o(t),g=f.length+1,l=new ArrayBuffer(t+g),_=new Uint8Array(l)
if(_[0]=e,_.set(f,1),this.type==u.PUBLISH)g=n(this.payloadMessage.destinationName,a,_,g)
else if(this.type==u.CONNECT){switch(this.mqttVersion){case 3:_.set(p,g),g+=p.length
break
case 4:_.set(I,g),g+=I.length}var v=0
this.cleanSession&&(v=2),void 0!=this.willMessage&&(v|=4,v|=this.willMessage.qos<<3,this.willMessage.retained&&(v|=32)),void 0!=this.userName&&(v|=128),void 0!=this.password&&(v|=64),_[g++]=v,g=s(this.keepAliveInterval,_,g)}switch(void 0!=this.messageIdentifier&&(g=s(this.messageIdentifier,_,g)),this.type){case u.CONNECT:g=n(this.clientId,r(this.clientId),_,g),void 0!=this.willMessage&&(g=n(this.willMessage.destinationName,r(this.willMessage.destinationName),_,g),g=s(c.byteLength,_,g),_.set(c,g),g+=c.byteLength),void 0!=this.userName&&(g=n(this.userName,r(this.userName),_,g)),void 0!=this.password&&(g=n(this.password,r(this.password),_,g))
break
case u.PUBLISH:_.set(d,g)
break
case u.SUBSCRIBE:for(var h=0;h<this.topics.length;h++)g=n(this.topics[h],i[h],_,g),_[g++]=this.requestedQos[h]
break
case u.UNSUBSCRIBE:for(var h=0;h<this.topics.length;h++)g=n(this.topics[h],i[h],_,g)}return l}
var w=function(e,t,s){this._client=e,this._window=t,this._keepAliveInterval=1e3*s,this.isReset=!1
var n=new v(u.PINGREQ).encode(),i=function(e){return function(){return o.apply(e)}},o=function(){this.isReset?(this.isReset=!1,this._client._trace("Pinger.doPing","send PINGREQ"),this._client.socket.send(n),this.timeout=this._window.setTimeout(i(this),this._keepAliveInterval)):(this._client._trace("Pinger.doPing","Timed out"),this._client._disconnected(g.PING_TIMEOUT.code,_(g.PING_TIMEOUT)))}
this.reset=function(){this.isReset=!0,this._window.clearTimeout(this.timeout),this._keepAliveInterval>0&&(this.timeout=setTimeout(i(this),this._keepAliveInterval))},this.cancel=function(){this._window.clearTimeout(this.timeout)}},E=function(e,t,s,n,i){this._window=t,s||(s=30)
var o=function(e,t,s){return function(){return e.apply(t,s)}}
this.timeout=setTimeout(o(n,e,i),1e3*s),this.cancel=function(){this._window.clearTimeout(this.timeout)}},y=function(t,s,n,i,o){if(!("WebSocket"in e&&null!==e.WebSocket))throw new Error(_(g.UNSUPPORTED,["WebSocket"]))
if(!("localStorage"in e&&null!==e.localStorage))throw new Error(_(g.UNSUPPORTED,["localStorage"]))
if(!("ArrayBuffer"in e&&null!==e.ArrayBuffer))throw new Error(_(g.UNSUPPORTED,["ArrayBuffer"]))
this._trace("Paho.MQTT.Client",t,s,n,i,o),this.host=s,this.port=n,this.path=i,this.uri=t,this.clientId=o,this._localKey=s+":"+n+("/mqtt"!=i?":"+i:"")+":"+o+":",this._msg_queue=[],this._sentMessages={},this._receivedMessages={},this._notify_msg_sent={},this._message_identifier=1,this._sequence=0
for(var r in localStorage)(0==r.indexOf("Sent:"+this._localKey)||0==r.indexOf("Received:"+this._localKey))&&this.restore(r)}
y.prototype.host,y.prototype.port,y.prototype.path,y.prototype.uri,y.prototype.clientId,y.prototype.socket,y.prototype.connected=!1,y.prototype.maxMessageIdentifier=65536,y.prototype.connectOptions,y.prototype.hostIndex,y.prototype.onConnectionLost,y.prototype.onMessageDelivered,y.prototype.onMessageArrived,y.prototype.traceFunction,y.prototype._msg_queue=null,y.prototype._connectTimeout,y.prototype.sendPinger=null,y.prototype.receivePinger=null,y.prototype.receiveBuffer=null,y.prototype._traceBuffer=null,y.prototype._MAX_TRACE_ENTRIES=100,y.prototype.connect=function(e){var t=this._traceMask(e,"password")
if(this._trace("Client.connect",t,this.socket,this.connected),this.connected)throw new Error(_(g.INVALID_STATE,["already connected"]))
if(this.socket)throw new Error(_(g.INVALID_STATE,["already connected"]))
this.connectOptions=e,e.uris?(this.hostIndex=0,this._doConnect(e.uris[0])):this._doConnect(this.uri)},y.prototype.subscribe=function(e,t){if(this._trace("Client.subscribe",e,t),!this.connected)throw new Error(_(g.INVALID_STATE,["not connected"]))
var s=new v(u.SUBSCRIBE)
s.topics=[e],void 0!=t.qos?s.requestedQos=[t.qos]:s.requestedQos=[0],t.onSuccess&&(s.onSuccess=function(e){t.onSuccess({invocationContext:t.invocationContext,grantedQos:e})}),t.onFailure&&(s.onFailure=function(e){t.onFailure({invocationContext:t.invocationContext,errorCode:e})}),t.timeout&&(s.timeOut=new E(this,window,t.timeout,t.onFailure,[{invocationContext:t.invocationContext,errorCode:g.SUBSCRIBE_TIMEOUT.code,errorMessage:_(g.SUBSCRIBE_TIMEOUT)}])),this._requires_ack(s),this._schedule_message(s)},y.prototype.unsubscribe=function(e,t){if(this._trace("Client.unsubscribe",e,t),!this.connected)throw new Error(_(g.INVALID_STATE,["not connected"]))
var s=new v(u.UNSUBSCRIBE)
s.topics=[e],t.onSuccess&&(s.callback=function(){t.onSuccess({invocationContext:t.invocationContext})}),t.timeout&&(s.timeOut=new E(this,window,t.timeout,t.onFailure,[{invocationContext:t.invocationContext,errorCode:g.UNSUBSCRIBE_TIMEOUT.code,errorMessage:_(g.UNSUBSCRIBE_TIMEOUT)}])),this._requires_ack(s),this._schedule_message(s)},y.prototype.send=function(e){if(this._trace("Client.send",e),!this.connected)throw new Error(_(g.INVALID_STATE,["not connected"]))
wireMessage=new v(u.PUBLISH),wireMessage.payloadMessage=e,e.qos>0?this._requires_ack(wireMessage):this.onMessageDelivered&&(this._notify_msg_sent[wireMessage]=this.onMessageDelivered(wireMessage.payloadMessage)),this._schedule_message(wireMessage)},y.prototype.disconnect=function(){if(this._trace("Client.disconnect"),!this.socket)throw new Error(_(g.INVALID_STATE,["not connecting or connected"]))
wireMessage=new v(u.DISCONNECT),this._notify_msg_sent[wireMessage]=f(this._disconnected,this),this._schedule_message(wireMessage)},y.prototype.getTraceLog=function(){if(null!==this._traceBuffer){this._trace("Client.getTraceLog",new Date),this._trace("Client.getTraceLog in flight messages",this._sentMessages.length)
for(var e in this._sentMessages)this._trace("_sentMessages ",e,this._sentMessages[e])
for(var e in this._receivedMessages)this._trace("_receivedMessages ",e,this._receivedMessages[e])
return this._traceBuffer}},y.prototype.startTrace=function(){null===this._traceBuffer&&(this._traceBuffer=[]),this._trace("Client.startTrace",new Date,h)},y.prototype.stopTrace=function(){delete this._traceBuffer},y.prototype._doConnect=function(e){if(this.connectOptions.useSSL){var t=e.split(":")
t[0]="wss",e=t.join(":")}this.connected=!1,this.connectOptions.mqttVersion<4?this.socket=new WebSocket(e,["mqttv3.1"]):this.socket=new WebSocket(e,["mqtt"]),this.socket.binaryType="arraybuffer",this.socket.onopen=f(this._on_socket_open,this),this.socket.onmessage=f(this._on_socket_message,this),this.socket.onerror=f(this._on_socket_error,this),this.socket.onclose=f(this._on_socket_close,this),this.sendPinger=new w(this,window,this.connectOptions.keepAliveInterval),this.receivePinger=new w(this,window,this.connectOptions.keepAliveInterval),this._connectTimeout=new E(this,window,this.connectOptions.timeout,this._disconnected,[g.CONNECT_TIMEOUT.code,_(g.CONNECT_TIMEOUT)])},y.prototype._schedule_message=function(e){this._msg_queue.push(e),this.connected&&this._process_queue()},y.prototype.store=function(e,t){var s={type:t.type,messageIdentifier:t.messageIdentifier,version:1}
switch(t.type){case u.PUBLISH:t.pubRecReceived&&(s.pubRecReceived=!0),s.payloadMessage={}
for(var n="",i=t.payloadMessage.payloadBytes,o=0;o<i.length;o++)i[o]<=15?n=n+"0"+i[o].toString(16):n+=i[o].toString(16)
s.payloadMessage.payloadHex=n,s.payloadMessage.qos=t.payloadMessage.qos,s.payloadMessage.destinationName=t.payloadMessage.destinationName,t.payloadMessage.duplicate&&(s.payloadMessage.duplicate=!0),t.payloadMessage.retained&&(s.payloadMessage.retained=!0),0==e.indexOf("Sent:")&&(void 0===t.sequence&&(t.sequence=++this._sequence),s.sequence=t.sequence)
break
default:throw Error(_(g.INVALID_STORED_DATA,[key,s]))}localStorage.setItem(e+this._localKey+t.messageIdentifier,JSON.stringify(s))},y.prototype.restore=function(e){var t=localStorage.getItem(e),s=JSON.parse(t),n=new v(s.type,s)
switch(s.type){case u.PUBLISH:for(var i=s.payloadMessage.payloadHex,o=new ArrayBuffer(i.length/2),r=new Uint8Array(o),a=0;i.length>=2;){var c=parseInt(i.substring(0,2),16)
i=i.substring(2,i.length),r[a++]=c}var h=new Paho.MQTT.Message(r)
h.qos=s.payloadMessage.qos,h.destinationName=s.payloadMessage.destinationName,s.payloadMessage.duplicate&&(h.duplicate=!0),s.payloadMessage.retained&&(h.retained=!0),n.payloadMessage=h
break
default:throw Error(_(g.INVALID_STORED_DATA,[e,t]))}0==e.indexOf("Sent:"+this._localKey)?(n.payloadMessage.duplicate=!0,this._sentMessages[n.messageIdentifier]=n):0==e.indexOf("Received:"+this._localKey)&&(this._receivedMessages[n.messageIdentifier]=n)},y.prototype._process_queue=function(){for(var e=null,t=this._msg_queue.reverse();e=t.pop();)this._socket_send(e),this._notify_msg_sent[e]&&(this._notify_msg_sent[e](),delete this._notify_msg_sent[e])},y.prototype._requires_ack=function(e){var t=Object.keys(this._sentMessages).length
if(t>this.maxMessageIdentifier)throw Error("Too many messages:"+t)
for(;void 0!==this._sentMessages[this._message_identifier];)this._message_identifier++
e.messageIdentifier=this._message_identifier,this._sentMessages[e.messageIdentifier]=e,e.type===u.PUBLISH&&this.store("Sent:",e),this._message_identifier===this.maxMessageIdentifier&&(this._message_identifier=1)},y.prototype._on_socket_open=function(){var e=new v(u.CONNECT,this.connectOptions)
e.clientId=this.clientId,this._socket_send(e)},y.prototype._on_socket_message=function(e){this._trace("Client._on_socket_message",e.data),this.receivePinger.reset()
for(var t=this._deframeMessages(e.data),s=0;s<t.length;s+=1)this._handleMessage(t[s])},y.prototype._deframeMessages=function(e){var s=new Uint8Array(e)
if(this.receiveBuffer){var n=new Uint8Array(this.receiveBuffer.length+s.length)
n.set(this.receiveBuffer),n.set(s,this.receiveBuffer.length),s=n,delete this.receiveBuffer}try{for(var i=0,o=[];i<s.length;){var r=t(s,i),a=r[0]
if(i=r[1],null===a)break
o.push(a)}i<s.length&&(this.receiveBuffer=s.subarray(i))}catch(c){return void this._disconnected(g.INTERNAL_ERROR.code,_(g.INTERNAL_ERROR,[c.message,c.stack.toString()]))}return o},y.prototype._handleMessage=function(e){this._trace("Client._handleMessage",e)
try{switch(e.type){case u.CONNACK:if(this._connectTimeout.cancel(),this.connectOptions.cleanSession){for(var t in this._sentMessages){var s=this._sentMessages[t]
localStorage.removeItem("Sent:"+this._localKey+s.messageIdentifier)}this._sentMessages={}
for(var t in this._receivedMessages){var n=this._receivedMessages[t]
localStorage.removeItem("Received:"+this._localKey+n.messageIdentifier)}this._receivedMessages={}}if(0!==e.returnCode){this._disconnected(g.CONNACK_RETURNCODE.code,_(g.CONNACK_RETURNCODE,[e.returnCode,l[e.returnCode]]))
break}this.connected=!0,this.connectOptions.uris&&(this.hostIndex=this.connectOptions.uris.length)
var i=new Array
for(var o in this._sentMessages)this._sentMessages.hasOwnProperty(o)&&i.push(this._sentMessages[o])
for(var i=i.sort(function(e,t){return e.sequence-t.sequence}),r=0,a=i.length;a>r;r++){var s=i[r]
if(s.type==u.PUBLISH&&s.pubRecReceived){var c=new v(u.PUBREL,{messageIdentifier:s.messageIdentifier})
this._schedule_message(c)}else this._schedule_message(s)}this.connectOptions.onSuccess&&this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext}),this._process_queue()
break
case u.PUBLISH:this._receivePublish(e)
break
case u.PUBACK:var s=this._sentMessages[e.messageIdentifier]
s&&(delete this._sentMessages[e.messageIdentifier],localStorage.removeItem("Sent:"+this._localKey+e.messageIdentifier),this.onMessageDelivered&&this.onMessageDelivered(s.payloadMessage))
break
case u.PUBREC:var s=this._sentMessages[e.messageIdentifier]
if(s){s.pubRecReceived=!0
var c=new v(u.PUBREL,{messageIdentifier:e.messageIdentifier})
this.store("Sent:",s),this._schedule_message(c)}break
case u.PUBREL:var n=this._receivedMessages[e.messageIdentifier]
localStorage.removeItem("Received:"+this._localKey+e.messageIdentifier),n&&(this._receiveMessage(n),delete this._receivedMessages[e.messageIdentifier])
var h=new v(u.PUBCOMP,{messageIdentifier:e.messageIdentifier})
this._schedule_message(h)
break
case u.PUBCOMP:var s=this._sentMessages[e.messageIdentifier]
delete this._sentMessages[e.messageIdentifier],localStorage.removeItem("Sent:"+this._localKey+e.messageIdentifier),this.onMessageDelivered&&this.onMessageDelivered(s.payloadMessage)
break
case u.SUBACK:var s=this._sentMessages[e.messageIdentifier]
s&&(s.timeOut&&s.timeOut.cancel(),128===e.returnCode[0]?s.onFailure&&s.onFailure(e.returnCode):s.onSuccess&&s.onSuccess(e.returnCode),delete this._sentMessages[e.messageIdentifier])
break
case u.UNSUBACK:var s=this._sentMessages[e.messageIdentifier]
s&&(s.timeOut&&s.timeOut.cancel(),s.callback&&s.callback(),delete this._sentMessages[e.messageIdentifier])
break
case u.PINGRESP:this.sendPinger.reset()
break
case u.DISCONNECT:this._disconnected(g.INVALID_MQTT_MESSAGE_TYPE.code,_(g.INVALID_MQTT_MESSAGE_TYPE,[e.type]))
break
default:this._disconnected(g.INVALID_MQTT_MESSAGE_TYPE.code,_(g.INVALID_MQTT_MESSAGE_TYPE,[e.type]))}}catch(d){return void this._disconnected(g.INTERNAL_ERROR.code,_(g.INTERNAL_ERROR,[d.message,d.stack.toString()]))}},y.prototype._on_socket_error=function(e){this._disconnected(g.SOCKET_ERROR.code,_(g.SOCKET_ERROR,[e.data]))},y.prototype._on_socket_close=function(){this._disconnected(g.SOCKET_CLOSE.code,_(g.SOCKET_CLOSE))},y.prototype._socket_send=function(e){if(1==e.type){var t=this._traceMask(e,"password")
this._trace("Client._socket_send",t)}else this._trace("Client._socket_send",e)
this.socket.send(e.encode()),this.sendPinger.reset()},y.prototype._receivePublish=function(e){switch(e.payloadMessage.qos){case"undefined":case 0:this._receiveMessage(e)
break
case 1:var t=new v(u.PUBACK,{messageIdentifier:e.messageIdentifier})
this._schedule_message(t),this._receiveMessage(e)
break
case 2:this._receivedMessages[e.messageIdentifier]=e,this.store("Received:",e)
var s=new v(u.PUBREC,{messageIdentifier:e.messageIdentifier})
this._schedule_message(s)
break
default:throw Error("Invaild qos="+wireMmessage.payloadMessage.qos)}},y.prototype._receiveMessage=function(e){this.onMessageArrived&&this.onMessageArrived(e.payloadMessage)},y.prototype._disconnected=function(e,t){this._trace("Client._disconnected",e,t),this.sendPinger.cancel(),this.receivePinger.cancel(),this._connectTimeout&&this._connectTimeout.cancel(),this._msg_queue=[],this._notify_msg_sent={},this.socket&&(this.socket.onopen=null,this.socket.onmessage=null,this.socket.onerror=null,this.socket.onclose=null,1===this.socket.readyState&&this.socket.close(),delete this.socket),this.connectOptions.uris&&this.hostIndex<this.connectOptions.uris.length-1?(this.hostIndex++,this._doConnect(this.connectOptions.uris[this.hostIndex])):(void 0===e&&(e=g.OK.code,t=_(g.OK)),this.connected?(this.connected=!1,this.onConnectionLost&&this.onConnectionLost({errorCode:e,errorMessage:t})):4===this.connectOptions.mqttVersion&&this.connectOptions.mqttVersionExplicit===!1?(this._trace("Failed to connect V4, dropping back to V3"),this.connectOptions.mqttVersion=3,this.connectOptions.uris?(this.hostIndex=0,this._doConnect(this.connectOptions.uris[0])):this._doConnect(this.uri)):this.connectOptions.onFailure&&this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext,errorCode:e,errorMessage:t}))},y.prototype._trace=function(){if(this.traceFunction){for(var e in arguments)"undefined"!=typeof arguments[e]&&(arguments[e]=JSON.stringify(arguments[e]))
var t=Array.prototype.slice.call(arguments).join("")
this.traceFunction({severity:"Debug",message:t})}if(null!==this._traceBuffer)for(var e=0,s=arguments.length;s>e;e++)this._traceBuffer.length==this._MAX_TRACE_ENTRIES&&this._traceBuffer.shift(),0===e?this._traceBuffer.push(arguments[e]):"undefined"==typeof arguments[e]?this._traceBuffer.push(arguments[e]):this._traceBuffer.push("  "+JSON.stringify(arguments[e]))},y.prototype._traceMask=function(e,t){var s={}
for(var n in e)e.hasOwnProperty(n)&&(n==t?s[n]="******":s[n]=e[n])
return s}
var M=function(e,t,s,n){var i
if("string"!=typeof e)throw new Error(_(g.INVALID_TYPE,[typeof e,"host"]))
if(2==arguments.length){n=t,i=e
var o=i.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/)
if(!o)throw new Error(_(g.INVALID_ARGUMENT,[e,"host"]))
e=o[4]||o[2],t=parseInt(o[7]),s=o[8]}else{if(3==arguments.length&&(n=s,s="/mqtt"),"number"!=typeof t||0>t)throw new Error(_(g.INVALID_TYPE,[typeof t,"port"]))
if("string"!=typeof s)throw new Error(_(g.INVALID_TYPE,[typeof s,"path"]))
var r=-1!=e.indexOf(":")&&"["!=e.slice(0,1)&&"]"!=e.slice(-1)
i="ws://"+(r?"["+e+"]":e)+":"+t+s}for(var a=0,c=0;c<n.length;c++){var h=n.charCodeAt(c)
h>=55296&&56319>=h&&c++,a++}if("string"!=typeof n||a>65535)throw new Error(_(g.INVALID_ARGUMENT,[n,"clientId"]))
var u=new y(i,e,t,s,n)
this._getHost=function(){return e},this._setHost=function(){throw new Error(_(g.UNSUPPORTED_OPERATION))},this._getPort=function(){return t},this._setPort=function(){throw new Error(_(g.UNSUPPORTED_OPERATION))},this._getPath=function(){return s},this._setPath=function(){throw new Error(_(g.UNSUPPORTED_OPERATION))},this._getURI=function(){return i},this._setURI=function(){throw new Error(_(g.UNSUPPORTED_OPERATION))},this._getClientId=function(){return u.clientId},this._setClientId=function(){throw new Error(_(g.UNSUPPORTED_OPERATION))},this._getOnConnectionLost=function(){return u.onConnectionLost},this._setOnConnectionLost=function(e){if("function"!=typeof e)throw new Error(_(g.INVALID_TYPE,[typeof e,"onConnectionLost"]))
u.onConnectionLost=e},this._getOnMessageDelivered=function(){return u.onMessageDelivered},this._setOnMessageDelivered=function(e){if("function"!=typeof e)throw new Error(_(g.INVALID_TYPE,[typeof e,"onMessageDelivered"]))
u.onMessageDelivered=e},this._getOnMessageArrived=function(){return u.onMessageArrived},this._setOnMessageArrived=function(e){if("function"!=typeof e)throw new Error(_(g.INVALID_TYPE,[typeof e,"onMessageArrived"]))
u.onMessageArrived=e},this._getTrace=function(){return u.traceFunction},this._setTrace=function(e){if("function"!=typeof e)throw new Error(_(g.INVALID_TYPE,[typeof e,"onTrace"]))
u.traceFunction=e},this.connect=function(e){if(e=e||{},d(e,{timeout:"number",userName:"string",password:"string",willMessage:"object",keepAliveInterval:"number",cleanSession:"boolean",useSSL:"boolean",invocationContext:"object",onSuccess:"function",onFailure:"function",hosts:"object",ports:"object",mqttVersion:"number"}),void 0===e.keepAliveInterval&&(e.keepAliveInterval=60),e.mqttVersion>4||e.mqttVersion<3)throw new Error(_(g.INVALID_ARGUMENT,[e.mqttVersion,"connectOptions.mqttVersion"]))
if(void 0===e.mqttVersion?(e.mqttVersionExplicit=!1,e.mqttVersion=4):e.mqttVersionExplicit=!0,void 0===e.password&&void 0!==e.userName)throw new Error(_(g.INVALID_ARGUMENT,[e.password,"connectOptions.password"]))
if(e.willMessage){if(!(e.willMessage instanceof m))throw new Error(_(g.INVALID_TYPE,[e.willMessage,"connectOptions.willMessage"]))
if(e.willMessage.stringPayload,"undefined"==typeof e.willMessage.destinationName)throw new Error(_(g.INVALID_TYPE,[typeof e.willMessage.destinationName,"connectOptions.willMessage.destinationName"]))}if("undefined"==typeof e.cleanSession&&(e.cleanSession=!0),e.hosts){if(!(e.hosts instanceof Array))throw new Error(_(g.INVALID_ARGUMENT,[e.hosts,"connectOptions.hosts"]))
if(e.hosts.length<1)throw new Error(_(g.INVALID_ARGUMENT,[e.hosts,"connectOptions.hosts"]))
for(var t=!1,n=0;n<e.hosts.length;n++){if("string"!=typeof e.hosts[n])throw new Error(_(g.INVALID_TYPE,[typeof e.hosts[n],"connectOptions.hosts["+n+"]"]))
if(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(e.hosts[n])){if(0==n)t=!0
else if(!t)throw new Error(_(g.INVALID_ARGUMENT,[e.hosts[n],"connectOptions.hosts["+n+"]"]))}else if(t)throw new Error(_(g.INVALID_ARGUMENT,[e.hosts[n],"connectOptions.hosts["+n+"]"]))}if(t)e.uris=e.hosts
else{if(!e.ports)throw new Error(_(g.INVALID_ARGUMENT,[e.ports,"connectOptions.ports"]))
if(!(e.ports instanceof Array))throw new Error(_(g.INVALID_ARGUMENT,[e.ports,"connectOptions.ports"]))
if(e.hosts.length!=e.ports.length)throw new Error(_(g.INVALID_ARGUMENT,[e.ports,"connectOptions.ports"]))
e.uris=[]
for(var n=0;n<e.hosts.length;n++){if("number"!=typeof e.ports[n]||e.ports[n]<0)throw new Error(_(g.INVALID_TYPE,[typeof e.ports[n],"connectOptions.ports["+n+"]"]))
var o=e.hosts[n],r=e.ports[n],a=-1!=o.indexOf(":")
i="ws://"+(a?"["+o+"]":o)+":"+r+s,e.uris.push(i)}}}u.connect(e)},this.subscribe=function(e,t){if("string"!=typeof e)throw new Error("Invalid argument:"+e)
if(t=t||{},d(t,{qos:"number",invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"}),t.timeout&&!t.onFailure)throw new Error("subscribeOptions.timeout specified with no onFailure callback.")
if("undefined"!=typeof t.qos&&0!==t.qos&&1!==t.qos&&2!==t.qos)throw new Error(_(g.INVALID_ARGUMENT,[t.qos,"subscribeOptions.qos"]))
u.subscribe(e,t)},this.unsubscribe=function(e,t){if("string"!=typeof e)throw new Error("Invalid argument:"+e)
if(t=t||{},d(t,{invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"}),t.timeout&&!t.onFailure)throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.")
u.unsubscribe(e,t)},this.send=function(e,t,s,n){var i
if(0==arguments.length)throw new Error("Invalid argument.length")
if(1==arguments.length){if(!(e instanceof m)&&"string"!=typeof e)throw new Error("Invalid argument:"+typeof e)
if(i=e,"undefined"==typeof i.destinationName)throw new Error(_(g.INVALID_ARGUMENT,[i.destinationName,"Message.destinationName"]))
u.send(i)}else i=new m(t),i.destinationName=e,arguments.length>=3&&(i.qos=s),arguments.length>=4&&(i.retained=n),u.send(i)},this.disconnect=function(){u.disconnect()},this.getTraceLog=function(){return u.getTraceLog()},this.startTrace=function(){u.startTrace()},this.stopTrace=function(){u.stopTrace()},this.isConnected=function(){return u.connected}}
M.prototype={get host(){return this._getHost()},set host(e){this._setHost(e)},get port(){return this._getPort()},set port(e){this._setPort(e)},get path(){return this._getPath()},set path(e){this._setPath(e)},get clientId(){return this._getClientId()},set clientId(e){this._setClientId(e)},get onConnectionLost(){return this._getOnConnectionLost()},set onConnectionLost(e){this._setOnConnectionLost(e)},get onMessageDelivered(){return this._getOnMessageDelivered()},set onMessageDelivered(e){this._setOnMessageDelivered(e)},get onMessageArrived(){return this._getOnMessageArrived()},set onMessageArrived(e){this._setOnMessageArrived(e)},get trace(){return this._getTrace()},set trace(e){this._setTrace(e)}}
var m=function(e){var t
if(!("string"==typeof e||e instanceof ArrayBuffer||e instanceof Int8Array||e instanceof Uint8Array||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array))throw _(g.INVALID_ARGUMENT,[e,"newPayload"])
t=e,this._getPayloadString=function(){return"string"==typeof t?t:c(t,0,t.length)},this._getPayloadBytes=function(){if("string"==typeof t){var e=new ArrayBuffer(r(t)),s=new Uint8Array(e)
return a(t,s,0),s}return t}
var s=void 0
this._getDestinationName=function(){return s},this._setDestinationName=function(e){if("string"!=typeof e)throw new Error(_(g.INVALID_ARGUMENT,[e,"newDestinationName"]))
s=e}
var n=0
this._getQos=function(){return n},this._setQos=function(e){if(0!==e&&1!==e&&2!==e)throw new Error("Invalid argument:"+e)
n=e}
var i=!1
this._getRetained=function(){return i},this._setRetained=function(e){if("boolean"!=typeof e)throw new Error(_(g.INVALID_ARGUMENT,[e,"newRetained"]))
i=e}
var o=!1
this._getDuplicate=function(){return o},this._setDuplicate=function(e){o=e}}
return m.prototype={get payloadString(){return this._getPayloadString()},get payloadBytes(){return this._getPayloadBytes()},get destinationName(){return this._getDestinationName()},set destinationName(e){this._setDestinationName(e)},get qos(){return this._getQos()},set qos(e){this._setQos(e)},get retained(){return this._getRetained()},set retained(e){this._setRetained(e)},get duplicate(){return this._getDuplicate()},set duplicate(e){this._setDuplicate(e)}},{Client:M,Message:m}}(window)
