package com.quizapp.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.quizapp.filters.IdFilter;

@Configuration
public class FilterConfig {
	@Autowired
	IdFilter idFilter;
	@Bean
    public FilterRegistrationBean<IdFilter> idFilterRegistrationBean() {
        FilterRegistrationBean<IdFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(idFilter);
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(1);
        return registrationBean;
    }
}
