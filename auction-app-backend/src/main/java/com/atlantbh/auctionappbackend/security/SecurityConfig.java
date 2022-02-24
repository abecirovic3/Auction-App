package com.atlantbh.auctionappbackend.security;

import com.atlantbh.auctionappbackend.api.AuthWhitelistConfig;
import com.atlantbh.auctionappbackend.filter.CustomAuthenticationFilter;
import com.atlantbh.auctionappbackend.filter.CustomAuthorizationFilter;
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
    private final String apiPrefix;
    private final JwtUtil jwtUtil;

    @Autowired
    public SecurityConfig(
                            UserDetailsService userDetailsService,
                            PasswordEncoder passwordEncoder,
                            JwtConfig jwtConfig,
                            String apiPrefix,
                            JwtUtil jwtUtil
    ) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtConfig = jwtConfig;
        this.apiPrefix = apiPrefix;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter =
                new CustomAuthenticationFilter(authenticationManagerBean(), jwtUtil, jwtConfig);
        customAuthenticationFilter.setFilterProcessesUrl(apiPrefix + "/auth/login");

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests().antMatchers(AuthWhitelistConfig.getAuthWhitelist()).permitAll();
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
