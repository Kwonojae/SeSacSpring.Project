
package crud.board.config;

import crud.board.config.security.CustomAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;

@Configuration //설정파일을 만들기 위한 애노테이션 or Bean을 등록하기 위한 애노테이션이다.
@EnableWebSecurity //스프링시큐리티 사용을 위한 어노테이션선언
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;//application 에 설정된 데이터 정보

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/account/register", "/account/login", "/mainLogin", "/posts/**", "/api/posts/**").permitAll()


                .anyRequest().authenticated()//인증되어야한다 .
                .and()
                .cors()
                .and()
                .formLogin()
                .loginPage("/account/login")
                .usernameParameter("memberId")
                .passwordParameter("memberPwd")
                .loginProcessingUrl("/account/process")
                .defaultSuccessUrl("/mainLogin")
                .failureUrl("/")
                .permitAll()
                .and()
                .logout()
                .permitAll();


    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new CustomAuthenticationProvider();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.authenticationProvider(authenticationProvider());
//        auth.jdbcAuthentication()
//                .dataSource(dataSource)     //enabled 회원가입된 사용자인지 bit 타입 true false
//                .usersByUsernameQuery("select memberId, memberPwd, enabled "//인증처리 sql문 작성시 띄어쓰기 주의
//                        + "from member "
//                        + "where memberId = ?")
//                .authoritiesByUsernameQuery("select m.memberId, r.id "
//                        + "from member_role mr inner join member m on mr.member_Key = m.memberKey "
//                        + "inner join role r on mr.role_key = r.id "
//                        + "where m.memberId = ?");
    }
}