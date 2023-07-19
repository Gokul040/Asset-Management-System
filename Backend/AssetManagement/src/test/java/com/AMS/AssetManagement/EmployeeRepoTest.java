package com.AMS.AssetManagement;

import com.AMS.AssetManagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepoTest extends JpaRepository<Employee, Long> {

}
