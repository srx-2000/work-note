# 接口

## 拦截器

### HandshakeInterceptor(握手拦截器)

#### 功能描述

该拦截器主要用于用户在进行websocket握手时对用户进行拦截，可以在websocket握手之前对用户信息进行校验，如果信息符合则返回一个True，则spring会对用户进行放行，反之则不予通过。

1. 每次用户在浏览器客户端 js 中发起 webSocket 连接后，都会先进入本拦截器，主要作用如下：
        1）用于权限控制：比如可以控制没有登录的用户或者权限不足的用户无法连接进行操作
        2）用于标识用户：便于在 webSocket 处理器(WebSocketFacebookHandler)中向指定用户发送消息
        3）还可以进行其它的类似安全框架的安全监测，日志系统的记录日志等
2. HandshakeInterceptor 接口中只有两个方法 beforeHandshake(握手前)、afterHandshake(握手后)

#### 需实现方法

##### beforeHandshake()

该方法主要是用于握手之前的拦截

##### afterHandshake()

该方法主要是用于握手之后做一些处理

#### 配置

##### springMVC

```xml
<!-- websocket握手 -->
	<bean id="wxsocket" class="com.yq.handler.MessageHandler"/>
	
	<websocket:handlers allowed-origins="*">
		<websocket:mapping path="/socketConnect.c" handler="wxsocket"/>
		<websocket:handshake-interceptors>
			<bean class="com.yq.interceptor.WebSocketInterceptor"/>
			
		</websocket:handshake-interceptors>
	</websocket:handlers>
```

##### springboot

暂时没有配置，主要是需要写一个`webSocket配置类`用于实现`WebSocketHandler`接口

#### 简单示例

```java
public class WebSocketInterceptor implements HandshakeInterceptor {
    // 注意：这里的serverHttpRequest和serverHttpResponse本质上其实就是javaweb里最开始的那个servlet里的那个形参
    @Override
    public boolean beforeHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Map<String, Object> map) throws Exception {
        if (serverHttpRequest instanceof ServletServerHttpRequest) {
            ServletServerHttpRequest request = (ServletServerHttpRequest) serverHttpRequest;
            //生成一个UUID
            String uuid = UUID.randomUUID().toString().replace("-","");
            //将uuid放到websocketsession中
            map.put(ConstantPool.USER_UUID_KEY, uuid);
            return true;
        } else {
            return false;
        }
    }
    @Override
    public void afterHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Exception e) {

    }
}
```



## 处理器

### WebSocketHandler（websocket处理器）

#### 功能描述

一个用于websocket连接时的处理器，其中包含了对websocket连接的整个生命周期中的一系列钩子方法。

#### 需实现方法

##### void afterConnectionClosed(WebSocketSession session, CloseStatus status)

在任何一方关闭WebSocket连接之后，或者在发生传输错误之后调用。

##### void afterConnectionEstablished(WebSocketSession session)

在WebSocket协商成功且打开WebSocket连接准备使用后调用。

##### void handleMessage(WebSocketSession session, WebSocketMessage<?> message)

当新的WebSocket消息到达时调用。

##### void handleTransportError(WebSocketSession session, Throwable exception)

处理来自底层的WebSocket消息传输的错误。

##### boolean supportsPartialMessages()

websocketHandler是否处理过某些信息。主要用于将大的消息分割后分批次的传输过去时使用。当他置为true，且传输的消息大小刚好等于websocket最大的传输大小时，则认为有大消息被分割成小消息一个个传输过来了。

#### 配置

spring和springboot都不需要特别配置，只需要在使用时直接用自己写的类实现这个接口及其中的方法即可。

# 类

## 实体对象

### TextMessage(文本消息)

#### 构造器

##### TextMessage(byte[] payload)

从给定的字节[]创建一个新的WebSocket文本消息。

##### TextMessage(CharSequence payload)

从给定的CharSequence创建一个新的WebSocket文本消息。

##### TextMessage(CharSequence payload, boolean isLast)

isLast置True时表示该消息已是要传递的内容的全部，而isLast置False时则表示后续还有新的消息需要继续传输，主要用于面对比较大的信息时需要切分的场景。

#### 方法（不含继承方法）

##### int getPayloadLength()

返回消息中包含的二进制字节数。

##### byte[] asBytes()

将消息转为byte数组的形式。

##### String toStringPayload()

将消息转为String的形式。
