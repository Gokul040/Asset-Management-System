package com.AMS.AssetManagement;

import com.AMS.AssetManagement.entity.AssetDetails;
import com.AMS.AssetManagement.entity.AssetLocation;
import com.AMS.AssetManagement.entity.Employee;
import com.AMS.AssetManagement.entity.User;
import com.AMS.AssetManagement.serviceImpl.AssetDetailsService;
import com.AMS.AssetManagement.serviceImpl.AssetLocationService;
import com.AMS.AssetManagement.serviceImpl.EmployeeService;
import com.AMS.AssetManagement.serviceImpl.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AssetManagementProjectApplicationTests {

    @MockBean
    private AssetLocationService assetLocationService;
    @MockBean
    private EmployeeService employeeService;
    @MockBean
    private AssetDetailsService assetDetailsService;
    @MockBean
    private UserService userService;

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
        assertEquals("Gokul", employee.getEmployeeName());
    }

    @Test
    public void testGetEmployeeById() {
        Employee employee = new Employee();
        employee.setEmployeeRollNumber("123456");
        employee.setEmployeeName("Gokul");
        employee.setEmployeeEmail("gokul@example.com");
        Employee result = employeeService.createEmployee(employee);

        Optional<Employee> employee1 = employeeService.getEmployeeById(result.getId());
        assertNotNull(employee1);
        assertEquals("Gokul", employee.getEmployeeName());
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
        employee.get().setEmployeeName("Gokul");

        String result = employeeService.updateEmployee(employee.get());
        assertEquals("Success", result);
    }

    @Test
    public void testDeleteEmployee() {
        long employeeId = 123456;
        employeeService.deleteEmployee(employeeId);

        Optional<Employee> response = employeeService.getEmployeeById(employeeId);
        assertEquals(HttpStatus.NOT_FOUND, response.isPresent());
    }

    @Test
    public void testGetEmployeeLocationById() {
        Long employeeId = 1L;
        Optional<Employee> response = employeeService.getByEmployeeDetailsUsingLocationId(employeeId);
        assertEquals(HttpStatus.OK, response.isPresent());
    }

    @Test
    public void testNewLocation() {
      AssetLocation assetLocation = new AssetLocation();
      assetLocation.setPlaceId("1234567890");
      AssetLocation response = assetLocationService.createAssetLocation(assetLocation);
      assertEquals("Success! " + assetLocation, response);
    }

    @Test
    public void testGetAssetLocationById() {
      Long id = 1L;
      AssetLocation assetLocation = assetLocationService.getByLocationId(id);
      assertNotNull(assetLocation);
      assertEquals("1001", assetLocation.getPlaceId());
    }

    @Test
    public void testGetAllAssetLocation() {
      List<AssetLocation> assetLocations = assetLocationService.getAllAssetLocation();
      assertNotNull(assetLocations);
      assertTrue(assetLocations.size() > 0);
    }

    @Test
    public void testUpdateAsset() {
      AssetLocation assetLocation = new AssetLocation();
      assetLocation.setPlaceId("1234567890");
      String response = assetLocationService.updateAssetLocation(assetLocation);
      assertEquals("Update Successful", response);
    }

    @Test
    public void testDeleteAssetLocationById() {
      Long id = 1L;
      String response = assetLocationService.deleteAssetLocation(id);
      assertEquals("Delete Successful", response);
    }
    @Test
    public void testSaveAssetDetails() {
      AssetDetails assetDetails = new AssetDetails();
      assetDetails.setLaptop_name("Lenovo");
      assetDetails.setMonitorNumber("ABC123");
      assetDetails.setLanIdNumber("12345678");
      assetDetails.setKeyboardNumber("XYZ123");
      assetDetails.setLaptopChargerNumber("98765432");
      assetDetails.setMouseStatus(true);
      assetDetails.setEarPhoneStatus(true);
      assetDetails.setLaptopBag(true);
      assetDetails.setLockerCode("12345678");

      AssetDetails response = assetDetailsService.createAssetDetails(assetDetails);
      assertEquals("Added Successfully" + assetDetails, response);
    }

    @Test
    public void testGetAssetDetailsById() {
      Long id = 1L;
      Optional<AssetDetails> assetDetails = assetDetailsService.getAssetDetailsById(id);
      assertNotNull(assetDetails);
      assertEquals("Lenovo", assetDetails.get().getLaptop_name());
    }

    @Test
    public void testGetAllAssetDetails() {
      List<AssetDetails> assetDetails = assetDetailsService.getAllAssetDetails();
      assertNotNull(assetDetails);
      assertTrue(assetDetails.size() > 0);
    }

    @Test
    public void testUpdateAssetDetails() {
      AssetDetails assetDetails = new AssetDetails();
      assetDetails.setId(1L);
      assetDetails.setLaptop_name("Lenovo");
      assetDetails.setMonitorNumber("ABC124");
      assetDetails.setLanIdNumber("12345679");
      assetDetails.setKeyboardNumber("XYZ124");
      assetDetails.setLaptopChargerNumber("98765433");
      assetDetails.setMouseStatus(true);
      assetDetails.setEarPhoneStatus(true);
      assetDetails.setLaptopBag(true);
      assetDetails.setLockerCode("12345679");

      AssetDetails response = assetDetailsService.updateAssetDetails(assetDetails);
      assertEquals("Asset has been updated successfully!", response);
    }

    @Test
    public void testDeleteAssetById() {
      Long id = 1L;
      String response = assetDetailsService.deleteAssetDetails(id);
      assertEquals("Asset Deleted Successfully!", response);
    }

    @Test
    public void testGetUserById() {
      String id = "gokul@mail.com";
      Optional<User> user = userService.retrieveOne(id);
      assertNotNull(user);
      assertEquals("gokul@mail.com", user.get().getEmail());
    }

    @Test
    public void testGetAllUser() {
      List<User> users = userService.getUsers();
      assertNotNull(users);
      assertTrue(users.size() > 0);
    }

    @Test
    public void testUpdateProfile() {
      User user = new User();
      user.setId(1L);
      user.setFirstName("Gokul");
      user.setLastName("R");
      user.setEmail("gokul@mail.com");
      user.setPassword("password");
      user.setContact("1234567890");
      user.setRole("USER");
      user.setEnabled(true);

      Optional<User> _getOneUser = userService.update(user);
      if (_getOneUser.isPresent()) {
        assertEquals("Password has been updated successfully!", _getOneUser.get().getPassword());
      } else {
        assertEquals("Email Id does not exist in records!", _getOneUser.get().getEmail());
      }
    }

    @Test
    public void testDeleteUserById() {
      String response = userService.delete(1L);
      assertEquals("User Deleted Successfully!", response);
    }

    @Test
    public void testVerifyEmail() {
      String token = "1234567890";
      String verificationResult = userService.validateToken(token);
      assertEquals("valid", verificationResult);
    }

}
