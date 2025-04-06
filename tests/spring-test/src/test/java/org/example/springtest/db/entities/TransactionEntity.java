package org.example.springtest.db.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "transaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('transaction_transaction_id_seq')")
    @Column(name = "transaction_id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = Integer.MAX_VALUE)
    private String title;

    @Column(name = "type", length = Integer.MAX_VALUE)
    private String type;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @ColumnDefault("now()")
    @Column(name = "\"createdAt\"", nullable = false)
    private Instant createdAt;

    @ColumnDefault("now()")
    @Column(name = "\"updatedAt\"", nullable = false)
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private org.example.springtest.db.entities.UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

}