package com.webapp.beans;

import com.webapp.dao.PointResultDAO;
import com.webapp.model.PointResult;

import java.io.Serializable;
import java.util.List;

public class ResultsBean implements Serializable {
    
    private List<PointResult> results;
    private final PointResultDAO dao = new PointResultDAO();
    
    public ResultsBean() {
        loadResults();
    }
    
    public void loadResults() {
        System.out.println("ResultsBean.loadResults() вызван");
        results = dao.findAll();
        System.out.println("Загружено результатов: " + (results != null ? results.size() : "null"));
    }
    
    public List<PointResult> getResults() {
        if (results == null) {
            loadResults();
        }
        return results;
    }
    
    public void setResults(List<PointResult> results) {
        this.results = results;
    }
    
    public String clearResults() {
        dao.deleteAll();
        loadResults();
        return "main";
    }
}
