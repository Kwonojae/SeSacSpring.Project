package com.sesac.Search.controller;

import com.sesac.Search.model.Member;
import com.sesac.Search.repository.MemberRepository;
import com.sesac.Search.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/login")
     public String login(){
        return "account/login 여기니?";
    }

//    @GetMapping("/register")
//     String register(){
//        return "account/register";
//    }
    @GetMapping( "/register")
    public List<Member> all() {
         return memberRepository.findAll();
    }

//    @GetMapping("/register")
//     public Member register(@RequestBody Member member){
//        return memberService.save(member);
//    }
}
