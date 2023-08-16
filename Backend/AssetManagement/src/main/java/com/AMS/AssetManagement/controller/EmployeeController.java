package com.AMS.AssetManagement.controller;

import com.AMS.AssetManagement.entity.Employee;
import com.AMS.AssetManagement.repository.EmployeeRepo;
import com.AMS.AssetManagement.serviceImpl.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepo employeeRepo;


    @PostMapping("/newemployee")
    public String newEmployee(@RequestBody Employee employee){
        Optional <Employee> employee1 = employeeService.findByEmployeeRollNumber(employee.getEmployeeRollNumber());

        if(employee1.isPresent()){
           return "Employee already exists!";
        }else {
            employeeService.createEmployee(employee);
            return "Success! ";
        }
    }


    @GetMapping("/get-one-employee/{id}")
    public ResponseEntity<Employee> getAssetById(@PathVariable("id")String  id) {
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (employee.isPresent()) {
            return new ResponseEntity<>(employee.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-all-employee")
    public List<Employee> getAllAsset() {
    return  employeeService.getAllEmployees();
    }


    @PutMapping("/update-employee")
    public String updateAsset(@RequestBody Employee employee) {
        Optional<Employee> existingEmployee = employeeRepo.findById(employee.getId());
        if(existingEmployee.isPresent()){
            employeeService.updateEmployee(employee);
            return "Success";
        }else
        return "User Not exist";
    }

    @DeleteMapping("/delete-employee/{employeeId}")
    public String deleteAssetById(@PathVariable("employeeId") Long employeeId) {
         employeeService.deleteEmployee(employeeId);
         return "Delete Successful";
    }

    @GetMapping("/get-one-employee-assetLocation/{id}")
    public ResponseEntity<Employee> getAssetLocationById(@PathVariable("id")Long  id) {
        Optional<Employee> employee = employeeService.getByEmployeeDetailsUsingLocationId(id);
        if (employee.isPresent()) {
            return new ResponseEntity<>(employee.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
