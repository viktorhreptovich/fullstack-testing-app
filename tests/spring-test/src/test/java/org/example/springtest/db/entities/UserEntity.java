package org.example.springtest.db.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "\"user\"")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('user_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = Integer.MAX_VALUE)
    private String username;

    @Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
    private String email;

    @Column(name = "password", nullable = false, length = Integer.MAX_VALUE)
    private String password;

    @ColumnDefault("now()")
    @Column(name = "\"createdAt\"", nullable = false, insertable = false)
    private Instant createdAt;

    @ColumnDefault("now()")
    @Column(name = "\"updatedAt\"", nullable = false, insertable = false)
    private Instant updatedAt;

    @OneToMany(mappedBy = "user")
    private Set<CategoryEntity> categories = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<TransactionEntity> transactions = new LinkedHashSet<>();

}