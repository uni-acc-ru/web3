package com.webapp.util;

public class PointValidator {
    
    public static boolean checkHit(double x, double y, double r) {
        if (r <= 0) {
            return false;
        }
        
        if (x > 0 && y > 0) {
            return (x * x + y * y) <= (r * r);
        }

        if (x <= 0 && y >= 0) {
            return x >= -r && y <= r / 2;
        }

        if (x >= 0 && y <= 0) {
            return x <= r / 2 && y >= -r / 2 && y >= -x;
        }

        if (x <= 0 && y <= 0) {
            return false;
        }

        if (x == 0 && y == 0) {
            return true;
        }
        
        if (x == 0 && y > 0) {
            return y <= r / 2;
        }
        
        if (x == 0 && y < 0) {
            return false;
        }
        
        if (y == 0 && x > 0) {
            return x <= r / 2;
        }
        
        if (y == 0 && x < 0) {
            return x >= -r;
        }
        
        return false;
    }
}