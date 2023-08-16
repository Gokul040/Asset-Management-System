package com.AMS.AssetManagement;

import com.AMS.AssetManagement.entity.Employee;
import com.AMS.AssetManagement.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepoTest extends JpaRepository<User, Long> {
}
