package crud.board.domain.posts;

import crud.board.domain.TimeEntity;
import lombok.*;

import javax.persistence.*;

//TODO @Data 나중에 db값 확인
@Getter
@Entity// DB테이블과 매핑되는 객체
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Posts extends TimeEntity {
    @Id
    @GeneratedValue
    private Long id;
    @Column(length = 100, nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    @Column(length = 10, nullable = false)
    private String writer;
    @Column(columnDefinition = "integer default 0", nullable = false)
    private int view;

    //TODO 나중에 더 추가할 기능
    @Builder // setter
    public Posts(Long id, String title, String content, String writer, int view) {
        this.id = id;
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.view = view;

    }
}
