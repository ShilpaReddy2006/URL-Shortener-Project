package com.shilpa.url_shortener.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shilpa.url_shortener.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);
}
