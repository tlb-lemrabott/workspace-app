package com.example.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WebAccount {
    private String accountId;
    private String companyName;
    private String companyNameLower; // For case-insensitive search
    private String email;
    private String username;
    private String password;
    private String resourceLink;
    private Date creation_date;
    private Date updated_date;

    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { 
        this.companyName = companyName; 
        // Automatically set the lowercase version for search
        this.companyNameLower = companyName != null ? companyName.toLowerCase() : null;
    }

    public String getCompanyNameLower() { return companyNameLower; }
    public void setCompanyNameLower(String companyNameLower) { this.companyNameLower = companyNameLower; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getResourceLink() { return resourceLink; }
    public void setResourceLink(String resourceLink) { this.resourceLink = resourceLink; }

    public Date getCreation_date() { return creation_date; }
    public void setCreation_date(Date creation_date) { this.creation_date = creation_date; }

    public Date getUpdated_date() { return updated_date; }
    public void setUpdated_date(Date updated_date) { this.updated_date = updated_date; }
}
