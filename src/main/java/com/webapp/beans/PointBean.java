package com.webapp.beans;

import com.webapp.dao.PointResultDAO;
import com.webapp.model.PointResult;
import com.webapp.util.PointValidator;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

import java.io.Serializable;

public class PointBean implements Serializable {
    
    private Double x;
    private Double y;
    private Double r;
    
    private final PointResultDAO dao = new PointResultDAO();
    
    public String checkPoint() {
        FacesContext context = FacesContext.getCurrentInstance();
        
        System.out.println("PointBean.checkPoint вызван с x=" + x + ", y=" + y + ", r=" + r);
        
        if (x == null) {
            context.addMessage(null, new FacesMessage(
                FacesMessage.SEVERITY_ERROR, "Ошибка", "Выберите значение X"));
            return null;
        }
        
        if (y == null) {
            context.addMessage(null, new FacesMessage(
                FacesMessage.SEVERITY_ERROR, "Ошибка", "Введите значение Y"));
            return null;
        }
        
        if (y < -5 || y > 3) {
            context.addMessage(null, new FacesMessage(
                FacesMessage.SEVERITY_ERROR, "Ошибка", "Y должен быть числом от -5 до 3"));
            return null;
        }
        
        if (r == null) {
            context.addMessage(null, new FacesMessage(
                FacesMessage.SEVERITY_ERROR, "Ошибка", "Введите значение R"));
            return null;
        }
        
        if (r < 2 || r > 5) {
            context.addMessage(null, new FacesMessage(
                FacesMessage.SEVERITY_ERROR, "Ошибка", "R должен быть числом от 2 до 5"));
            return null;
        }
        
        long startTime = System.nanoTime();
        boolean hit = PointValidator.checkHit(x, y, r);
        long endTime = System.nanoTime();
        long scriptTime = (endTime - startTime) / 1000;
        
        PointResult result = new PointResult(x, y, r, hit, scriptTime);
        dao.save(result);
        
        System.out.println("Точка сохранена: " + result);

        ResultsBean resultsBean = (ResultsBean) context.getExternalContext()
            .getSessionMap().get("resultsBean");
        if (resultsBean != null) {
            resultsBean.loadResults();
            System.out.println("Результатов загружено: " + resultsBean.getResults().size());
        } else {
            resultsBean = new ResultsBean();
            context.getExternalContext().getSessionMap().put("resultsBean", resultsBean);
            System.out.println("Создан новый ResultsBean");
        }
        
        return "main";
    }
    
    public Double getX() {
        return x;
    }
    
    public void setX(Double x) {
        this.x = x;
        System.out.println("PointBean.x установлен в " + this.x);
    }
    
    public Double getY() {
        return y;
    }
    
    public void setY(Double y) {
        this.y = y;
    }
    
    public Double getR() {
        return r;
    }
    
    public void setR(Double r) {
        this.r = r;
    }
}
