import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import { useAppContext } from "../context/AppContext";
import {
  User,
  Settings as SettingsIcon,
  Database,
  CreditCard,
  ShieldCheck,
  Bell,
  HelpCircle,
  Save,
  Loader2
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Switch } from "../components/ui/Switch";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { Separator } from "../components/ui/Seperator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form schemas
const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().optional(),
});

const notificationFormSchema = z.object({
  stockAlerts: z.boolean().default(true),
  salesNotifications: z.boolean().default(true),
  paymentAlerts: z.boolean().default(true),
  systemUpdates: z.boolean().default(false),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const paymentFormSchema = z.object({
  enableCashPayments: z.boolean().default(true),
  enableCreditCards: z.boolean().default(true),
  enableMobilePayments: z.boolean().default(false),
});

export default function Settings() {
  const { toast } = useToast();
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form
  const profileForm = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: "admin@gmail.com", // Example data
      role: user?.role || "",
      bio: "Jungle Safari Shop Manager with expertise in inventory management and customer service.",
    },
  });

  // Notifications form
  const notificationForm = useForm({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      stockAlerts: true,
      salesNotifications: true,
      paymentAlerts: true,
      systemUpdates: false,
    },
  });

  // Security form
  const securityForm = useForm({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Payment settings form
  const paymentForm = useForm({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      enableCashPayments: true,
      enableCreditCards: true,
      enableMobilePayments: false,
    },
  });

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data) => {
      return apiRequest("PATCH", "/api/users/profile", data);
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Notification settings mutation
  const updateNotificationsMutation = useMutation({
    mutationFn: (data) => {
      return apiRequest("PATCH", "/api/users/notifications", data);
    },
    onSuccess: () => {
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update notifications",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Password update mutation
  const updatePasswordMutation = useMutation({
    mutationFn: (data) => {
      return apiRequest("PATCH", "/api/users/password", data);
    },
    onSuccess: () => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      securityForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update password",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Payment settings mutation
  const updatePaymentSettingsMutation = useMutation({
    mutationFn: (data) => {
      return apiRequest("PATCH", "/api/settings/payment", data);
    },
    onSuccess: () => {
      toast({
        title: "Payment settings updated",
        description: "Your payment configuration has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update payment settings",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Form submission handlers
  const onProfileSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  const onNotificationsSubmit = (data) => {
    updateNotificationsMutation.mutate(data);
  };

  const onSecuritySubmit = (data) => {
    updatePasswordMutation.mutate(data);
  };

  const onPaymentSubmit = (data) => {
    updatePaymentSettingsMutation.mutate(data);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#264653]">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account and application settings</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-[#F4F1DE] p-1">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-[#2A9D8F] data-[state=active]:text-white"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#2A9D8F] data-[state=active]:text-white"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-[#2A9D8F] data-[state=active]:text-white"
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-[#2A9D8F] data-[state=active]:text-white"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payment
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="data-[state=active]:bg-[#2A9D8F] data-[state=active]:text-white"
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#264653]">Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-lg">{user?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                
                <div className="flex-1">
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button 
                          type="submit"
                          className="bg-[#2A9D8F] hover:bg-[#1E7268]"
                          disabled={updateProfileMutation.isPending}
                        >
                          {updateProfileMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#264653]">Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="stockAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Inventory Stock Alerts</FormLabel>
                            <FormDescription>
                              Receive notifications when product stock falls below minimum levels
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="salesNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Sales Notifications</FormLabel>
                            <FormDescription>
                              Get notified about new sales and transaction updates
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="paymentAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Payment Alerts</FormLabel>
                            <FormDescription>
                              Receive notifications about payment status changes
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="systemUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">System Updates</FormLabel>
                            <FormDescription>
                              Get notified about system updates and new features
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-[#2A9D8F] hover:bg-[#1E7268]"
                    disabled={updateNotificationsMutation.isPending}
                  >
                    {updateNotificationsMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#264653]">Security Settings</CardTitle>
              <CardDescription>
                Update your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormDescription>
                            Password must contain at least 8 characters, including uppercase, lowercase, and a number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-[#2A9D8F] hover:bg-[#1E7268]"
                    disabled={updatePasswordMutation.isPending}
                  >
                    {updatePasswordMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              
              <Separator className="my-8" />
              
              <div>
                <h3 className="text-lg font-medium text-[#264653] mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication
                </p>
                <Button variant="outline">Set Up 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#264653]">Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and gateways for your shop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#264653]">Payment Methods</h3>
                    
                    <FormField
                      control={paymentForm.control}
                      name="enableCashPayments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Cash Payments</FormLabel>
                            <FormDescription>
                              Allow customers to pay with cash
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={paymentForm.control}
                      name="enableCreditCards"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Credit Card Payments</FormLabel>
                            <FormDescription>
                              Allow customers to pay with credit/debit cards
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={paymentForm.control}
                      name="enableMobilePayments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Mobile Payments</FormLabel>
                            <FormDescription>
                              Allow customers to pay with mobile payment methods
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-[#2A9D8F] hover:bg-[#1E7268]"
                    disabled={updatePaymentSettingsMutation.isPending}
                  >
                    {updatePaymentSettingsMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#264653]">System Settings</CardTitle>
              <CardDescription>
                Configure system-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-[#264653] mb-2">Database Configuration</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Manage your database settings and connections
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 items-center p-4 rounded-lg border border-gray-200">
                    <Database className="h-8 w-8 text-[#2A9D8F]" />
                    <div className="flex-1">
                      <p className="font-medium">Currently using in-memory storage</p>
                      <p className="text-sm text-gray-500">For production use, configure a persistent database</p>
                    </div>
                    <Button variant="outline">Configure Database</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium text-[#264653] mb-2">Backup & Export</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Manage your data backups and exports
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Database className="mr-2 h-4 w-4" />
                      Backup System Data
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Database className="mr-2 h-4 w-4" />
                      Export All Data
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium text-[#264653] mb-2">System Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm text-gray-500">Version</dt>
                        <dd className="font-medium">Jeevantu v1.0.0</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Last Updated</dt>
                        <dd className="font-medium">July 18, 2023</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Storage Usage</dt>
                        <dd className="font-medium">127 MB</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Environment</dt>
                        <dd className="font-medium">Production</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="flex justify-center py-4">
                  <Button variant="outline" className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}