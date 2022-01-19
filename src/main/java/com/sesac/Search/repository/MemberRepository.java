package com.sesac.Search.repository;

import com.sesac.Search.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(value = "select m.memberKey from Member m where m.memberId = :id")
    Optional<Long> findByAccountMember(@Param("id") String id);

    @Query(value = "select m " +
            "from Member m where m.memberId = :#{#paramMember.memberId} and m.memberPwd = :#{#paramMember.memberPwd}")
    Optional<Member> findByMember(@Param(value = "paramMember") Member member);
}
