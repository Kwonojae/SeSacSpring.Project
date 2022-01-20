package com.sesac.Search.controller;

import com.sesac.Search.model.Member;
import com.sesac.Search.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


//@Controller
//@RequestMapping("/account/*")
@RestController
public class AccountController {

    @Autowired
    private MemberService memberService;

//    @Autowired
//    private MemberRepository memberRepository;


//    @GetMapping("login")          로그인
//     public String login(){
//        return "account/login";
//    }
//
//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    public List<Member> login() {
//        System.out.println("/request/join 요청이 들어왔습니다!: POST");
//         return
//    }
    @RequestMapping(value = "/message",method = RequestMethod.GET)
    @ResponseBody // public @ResponseBody String testByResponseBody()와 같이 리턴 타입 좌측에 지정 가능
    public String testByResponseBody() {
        String message = "안녕하세요. 잠시 후에 화면에서 만나요!";
        return message;
}

//
//    @GetMapping("register")       회원가입
//    public String register(){
//        return "account/register";
//    }
//    @PostMapping("register")
//    public String register(Member member){
//        memberService.save(member);
//        return "redirect:/"; //로그인이 완료되면 홈으로 이동
//    }
//    @GetMapping( "/register")       //전체 회원 조회
//    public List<Member> all() {
//        return memberRepository.findAll();
//    }
}
