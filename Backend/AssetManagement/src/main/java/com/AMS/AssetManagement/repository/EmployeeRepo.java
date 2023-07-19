package com.AMS.AssetManagement.repository;

import com.AMS.AssetManagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee,Long> {

   Optional <Employee> findByEmployeeRollNumber(String id);

   Optional<Employee> findByAssetLocationPlaceId(String id);

   Optional<Employee> findByAssetLocationId(Long id);
}
