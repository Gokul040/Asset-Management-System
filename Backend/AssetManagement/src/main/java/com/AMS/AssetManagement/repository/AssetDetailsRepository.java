package com.AMS.AssetManagement.repository;

import com.AMS.AssetManagement.entity.AssetDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetDetailsRepository extends JpaRepository<AssetDetails,Long> {

}
