## app抓包可能会遇见的问题

### 个别app抓不到数据包

这里说的情况是明明fiddler和模拟器已经全部配置好了，同时抓取别的app的包完全没有问题。但是只有在抓这个app的个别含有重要信息的包的时候抓不到。

​	这种情况主要有可能是以下两种问题

1. app内置了代理服务器【或无代理模式】

   这就导致用户在访问一些接口的时候走的并不是模拟器里指定的那个fiddler代理。

   **具体细节【无代理模式实现】**

   以最常用的okhttp来举例的话：

   ```kotlin
   private fun inOkHttp(){
       val intercept=HttpLoggingInterceptor()
       intercept.level=HttpLoggingInterceptor.Level.BODY
       if(mOkHttpClient=null)
       	mOkHttpClient=new OkHttpClient()
       mOkHttpClient=OkhttpClient.Builder()
       	.retryOnConnectionFailure(True)
       	.addInterceptor(Object:Interceptor{
             override fun intercept(chain:Interceptor.Chain?):Response{
                   val header=chain!!.request().newBuilder()
                 			.addHeader("Content-Type","application/x-www-form-")
                 			.addHeader("Connection","keep-alive")
                 			.addHeader("Accept","*/*")
                 			。addHeader("Cookie","add cookies here")
               }
           })
       	.proxy(Proxy.NO_PROXY)
       	.addInterceptor(intercept)
       	.connectTimeout(15,TimeUnit.SECONNDS)
       
   }
   ```

   其中最关键的点就是：`.proxy(Proxy.NO_PROXY)`，这里设置的是无代理模式，也就是说设置这个之后app则不会走fiddler等抓包软件设置的代理了，也不会与手机中安装的安全证书进行交互了。

   **解决方法：**

   需要再模拟器的手机中安装一个全局代理工具，如：proxydroid、drony等，同时在比较简单的情况下可以尝试使用HttpCannary这个软件。最后的最后还有wireshark这个网卡级的抓包工具。但是相对于上述三个软件wireshark分析起来会不方便很多。

2. ssl pining ssl证书校验

   就是app对服务端的证书做校验，我们也叫做单向认证，而fiddler上面肯定是没有这个证书的，所以app会校验不过，为什么浏览器不会出现这个问题，因为浏览器不会校验这个证书，而app是公司自己开发的，可以加这个校验的功能

   **解决方法：**

   逆向app扣出里面的证书，这个工程量就大了

