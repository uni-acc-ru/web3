package com.webapp.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "point_results")
public class PointResult implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private double x;
    
    @Column(nullable = false)
    private double y;
    
    @Column(nullable = false)
    private double r;
    
    @Column(nullable = false)
    private boolean hit;
    
    @Column(name = "request_time", nullable = false)
    private LocalDateTime requestTime;
    
    @Column(name = "script_time", nullable = false)
    private long scriptTime;
    
    public PointResult() {
    }
    
    public PointResult(double x, double y, double r, boolean hit, long scriptTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.requestTime = LocalDateTime.now();
        this.scriptTime = scriptTime;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public double getX() {
        return x;
    }
    
    public void setX(double x) {
        this.x = x;
    }
    
    public double getY() {
        return y;
    }
    
    public void setY(double y) {
        this.y = y;
    }
    
    public double getR() {
        return r;
    }
    
    public void setR(double r) {
        this.r = r;
    }
    
    public boolean isHit() {
        return hit;
    }
    
    public void setHit(boolean hit) {
        this.hit = hit;
    }
    
    public LocalDateTime getRequestTime() {
        return requestTime;
    }
    
    public void setRequestTime(LocalDateTime requestTime) {
        this.requestTime = requestTime;
    }
    
    public String getFormattedRequestTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        return requestTime.format(formatter);
    }
    
    public long getScriptTime() {
        return scriptTime;
    }
    
    public void setScriptTime(long scriptTime) {
        this.scriptTime = scriptTime;
    }
}
