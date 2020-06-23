# camunda-bpm-platform 开启 Cors

为了测试 Camunda BPM REST API，需要开启 CORS。

camunda-bpm-platform:latest 是 Tomcat 容器发行版，Tomcat 开启 CORS 的方法，参阅官方文档：[http://tomcat.apache.org/tomcat-7.0-doc/config/filter.html#CORS_Filter](https://tomcat.apache.org/tomcat-7.0-doc/config/filter.html#CORS_Filter)

修改 `web.xml`，添加 `CorsFilter`：

```xml
<!-- =================== Enable Cors ================================== -->

<filter>
  <filter-name>CorsFilter</filter-name>
  <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
  <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>*</param-value>
  </init-param>
</filter>
<filter-mapping>
  <filter-name>CorsFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

