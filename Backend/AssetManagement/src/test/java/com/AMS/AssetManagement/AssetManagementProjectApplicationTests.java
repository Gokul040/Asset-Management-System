package com.AMS.AssetManagement;

import com.AMS.AssetManagement.controller.AssetLocationController;
import com.AMS.AssetManagement.entity.Employee;
import com.AMS.AssetManagement.serviceImpl.AssetLocationService;
import com.AMS.AssetManagement.serviceImpl.EmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AssetManagementProjectApplicationTests {
  

    @Autowired
    private AssetLocationController assetLocationController;

    @MockBean
    private AssetLocationService assetLocationService;

    @MockBean
    private EmployeeService employeeService;

    @Test
    public void testNewEmployee() {
        Employee employee = new Employee();
        employee.setEmployeeRollNumber("123456");
        employee.setEmployeeName("Gokul");
        employee.setEmployeeEmail("gokul@example.com");
        employee.setEmployeeContact("1434354545");
//        employee.setAssetLocation(new AssetLocation(101L,"1001"));
        employee.setCreatedDate(new Date());
        employee.setUpdatedDate(new Date());
        employee.setStatus(true);

        Employee result = employeeService.createEmployee(employee);
        assertEquals("Gokul", result);
    }

    @Test
    public void testGetEmployeeById() {
        Employee employee = new Employee();
        employee.setEmployeeRollNumber("123456");
        employee.setEmployeeName("John Doe");
        employee.setEmployeeEmail("john.doe@example.com");
        Employee result = employeeService.createEmployee(employee);

        Optional<Employee> employee1 = employeeService.getEmployeeById(result.getId());
        assertNotNull(employee1);
        assertEquals("John Doe", employee1.get().getEmployeeName());
    }

    @Test
    public void testGetAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        assertTrue(employees.size() > 0);
    }

    @Test
    public void testUpdateEmployee() {
        String employeeId = "123456";
        Optional<Employee> employee = employeeService.getEmployeeById(employeeId);
        employee.get().setEmployeeName("Jane Doe");

        String result = employeeService.updateEmployee(employee.get());
        assertEquals("Success", result);
    }

    @Test
    public void testDeleteEmployee() {
        long employeeId = 123456;
        employeeService.deleteEmployee(employeeId);

        Optional<Employee> response = employeeService.getEmployeeById(employeeId);
        assertEquals(HttpStatus.NOT_FOUND, response.get());
    }

    @Test
    public void testGetEmployeeLocationById() {
        Long employeeId = 1L;
        Optional<Employee> response = employeeService.getByEmployeeDetailsUsingLocationId(employeeId);
        assertEquals(HttpStatus.OK, response.get());
    }
}
