package com.AMS.AssetManagement.service;

import com.AMS.AssetManagement.entity.Employee;

import java.util.List;
import java.util.Optional;

public interface lEmployeeService {

    Employee createEmployee(Employee employee);


    Optional<Employee> findByEmployeeRollNumber(String no);

    List<Employee> getAllEmployees();
    Optional<Employee> getEmployeeById(Long id);

    Optional<Employee> getEmployeeById(String id);

    Optional<Employee> getEmployeeRollNumber(String id);



    String updateEmployee(Employee employee);


    String deleteEmployee(Long id);

}
