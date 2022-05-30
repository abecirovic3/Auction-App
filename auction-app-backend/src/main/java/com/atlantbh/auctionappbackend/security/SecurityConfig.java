package com.atlantbh.auctionappbackend.security;

import com.atlantbh.auctionappbackend.api.ApiConfig;
import com.atlantbh.auctionappbackend.api.AuthWhitelistConfig;
import com.atlantbh.auctionappbackend.filter.JwtAuthenticationFilter;
import com.atlantbh.auctionappbackend.filter.JwtAuthorizationFilter;
import com.atlantbh.auctionappbackend.service.AuthService;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;
    private final ApiConfig apiConfig;
    private final Algorithm signAlgorithm;
    private final AuthService authService;

    @Autowired
    public SecurityConfig(
                            UserDetailsService userDetailsService,
                            PasswordEncoder passwordEncoder,
                            JwtConfig jwtConfig,
                            ApiConfig apiConfig,
                            Algorithm signAlgorithm,
                            AuthService authService
    ) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtConfig = jwtConfig;
        this.apiConfig = apiConfig;
        this.signAlgorithm = signAlgorithm;
        this.authService = authService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter =
                new JwtAuthenticationFilter(authenticationManagerBean(), signAlgorithm, jwtConfig, authService);
        jwtAuthenticationFilter.setFilterProcessesUrl(apiConfig.getPrefix() + "/auth/login");

        http.csrf().disable();
        http.cors();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests().antMatchers(AuthWhitelistConfig.getAuthWhitelist()).permitAll();
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(jwtAuthenticationFilter);
        http.addFilterBefore(new JwtAuthorizationFilter(jwtConfig, signAlgorithm), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
