package com.webapp.server;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

import java.io.File;

public class Server {
    
    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(5001);
        tomcat.setHostname("0.0.0.0");
        tomcat.getConnector();
        
        String webappDirLocation = "src/main/webapp/";
        Context ctx = tomcat.addWebapp("", new File(webappDirLocation).getAbsolutePath());
        
        System.out.println("Starting Tomcat on port 5001...");
        System.out.println("Web application directory: " + new File(webappDirLocation).getAbsolutePath());
        System.out.println("Listening on: 0.0.0.0:5001");
        
        tomcat.start();
        System.out.println("Tomcat started successfully!");
        System.out.println("Access the application at: http://localhost:5001/");
        
        tomcat.getServer().await();
    }
}
