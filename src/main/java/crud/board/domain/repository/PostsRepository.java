package crud.board.domain.repository;

import crud.board.domain.posts.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface PostsRepository extends JpaRepository<Posts,Long> {


    // jpaRepository에서는 by뒷 부분은 SQL의 where조건절에 해당함. 따라서 Containing 을 붙여주면 Like 검색이된다
    List<Posts> findByTitleContaining(String keyword);

    @Modifying @Query("update Posts p set p.view = p.view + 1 where p.id = :id") int updateView(Long id);




}
