package com.sesac.Search.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import javax.sql.DataSource;

@Configuration //설정파일을 만들기 위한 애노테이션 or Bean을 등록하기 위한 애노테이션이다.
@EnableWebSecurity //스프링시큐리티 사용을 위한 어노테이션선언
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/","/account/register").permitAll()
                .anyRequest().authenticated()//인증되어야한다 .
                .and()
                .formLogin()
                .loginPage("/account/login")
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("select memberId, memberPwd, enabled "//인증처리 sql문 작성시 띄어쓰기 주의
                        + "from member "
                        + "where memberId = ?")
                .authoritiesByUsernameQuery("select m.memberId, r.id "
                        + "from member_role mr inner join member m on mr.member_Key = m.memberKey "
                        + "inner join role r on mr.role_key = r.id "
                        + "where m.memberId = ?");
        //Authroization 권한
        //Autentication 로그인
    }
}
