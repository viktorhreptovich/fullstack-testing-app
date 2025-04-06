package org.example.springtest.db.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "category")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('category_category_id_seq')")
    @Column(name = "category_id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = Integer.MAX_VALUE)
    private String title;

    @ColumnDefault("now()")
    @Column(name = "\"createdAt\"", nullable = false)
    private Instant createdAt;

    @ColumnDefault("now()")
    @Column(name = "\"updatedAt\"", nullable = false)
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private org.example.springtest.db.entities.UserEntity user;

    @OneToMany(mappedBy = "category")
    private Set<org.example.springtest.db.entities.TransactionEntity> transactions = new LinkedHashSet<>();

}