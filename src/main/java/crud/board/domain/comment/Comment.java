//package crud.board.domain.comment;
//
//import crud.board.domain.TimeEntity;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.hibernate.annotations.ColumnDefault;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedDate;
//
//import javax.persistence.*;
//
//@NoArgsConstructor
//@Getter
//@Table(name = "coments")
//@Entity
//public class Comment extends TimeEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "comment_id")
//    private Long id;
//
//    //댓글 내용
//    private String comment;
//    //댓글 개수
//    private int commentCnt;
//    //
//    private int commentGroup;
//    @ColumnDefault("0")
//    @CreatedDate
//    private int commentSequence;
//
//    @Column(name = "modified_date")
//    @LastModifiedDate
//    private String modifiedDate;
//
//
//}
