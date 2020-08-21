package info.mamay.video.manager.videoManager;

import info.mamay.video.manager.videoManager.model.entities.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Веб безопасность.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{
    /**
     * Сервис работы с авторизироваными пользователями.
     */
    @Autowired
    private SpringDataJpaUserDetailService userDetailService;

    /**
     * Конфигурация авторизации. Назначаем сервис работы с пользователями
     * и кодировщик паролей.
     *
     * @param auth менеджер авторизации.
     * @throws Exception пробрасываем исключения.
     */
    @Override
    protected void configure(
        AuthenticationManagerBuilder auth)
    throws Exception
    {
        auth
            .userDetailsService(this.userDetailService)
            .passwordEncoder(Manager.PASSWORD_ENCODER);
    }

    /**
     * Конфигурация работы Веб сервисов. Определяем ресурсы, которые разрешены
     * всем пользователям. Определяем страницу логина. Выключаем CSRF
     * поддержку. Определяем страницу логаута.
     *
     * @param http Менеджер безопасности http протокола.
     * @throws Exception возникающие исключения.
     */
    @Override
    protected void configure(
        HttpSecurity http)
    throws Exception
    {
        http
            .authorizeRequests()
                .antMatchers("/built/**", "/main.css").permitAll()
//                .anyRequest().authenticated()
                .and()
//            .formLogin()
//                .defaultSuccessUrl("/", true)
//                .permitAll()
//                .and()
            .httpBasic()
                .and()
            .csrf().disable();
//            .logout()
//                .logoutSuccessUrl("/");
    }
}
