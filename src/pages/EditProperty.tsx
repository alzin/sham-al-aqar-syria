import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

const propertyFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  price: z.number().min(1, {
    message: "Price must be greater than 0.",
  }),
  currency: z.string(),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  city: z.string(),
  property_type: z.string(),
  status: z.string(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  area: z.number().min(1, {
    message: "Area must be greater than 0.",
  }),
  creationDate: z.date(),
  images: z.array(z.string()).optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyFormValues | null>(null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      currency: "ل.س",
      location: "",
      city: "دمشق",
      property_type: "apartment",
      status: "sale",
      bedrooms: 1,
      bathrooms: 1,
      area: 50,
      creationDate: new Date(),
      images: [],
    },
  });

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        toast({
          variant: "destructive",
          title: "خطأ",
          description: "لم يتم العثور على معرف العقار.",
        });
        return;
      }

      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          // Convert the data from the database to the form values
          const property: PropertyFormValues = {
            title: data.title,
            description: data.description || "",
            price: data.price,
            currency: data.currency,
            location: data.location,
            city: data.city,
            property_type: data.property_type,
            status: data.status,
            bedrooms: data.bedrooms || 1,
            bathrooms: data.bathrooms || 1,
            area: data.area,
            creationDate: new Date(data.creationDate),
            images: data.images || [],
          };

          setPropertyData(property);
          form.reset(property);
        } else {
          toast({
            variant: "destructive",
            title: "خطأ",
            description: "لم يتم العثور على العقار.",
          });
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
        toast({
          variant: "destructive",
          title: "خطأ",
          description: "فشل في جلب بيانات العقار.",
        });
      }
    };

    fetchPropertyData();
  }, [id, form, toast]);

  const handleSubmit = async (data: PropertyFormValues) => {
    setSubmitting(true);
    try {
      // Convert creation date to string if it's a Date object
      let creationDate = data.creationDate;
      if (creationDate instanceof Date) {
        creationDate = creationDate.toISOString();
      }

      const { error } = await supabase
        .from("properties")
        .update({
          title: data.title,
          description: data.description,
          price: data.price,
          currency: data.currency,
          location: data.location,
          city: data.city,
          property_type: data.property_type,
          status: data.status,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          area: data.area,
          creationDate: creationDate,
          images: data.images,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast({
        title: "تم تحديث العقار بنجاح",
      });
      navigate("/my-properties");
    } catch (error) {
      console.error("Error updating property:", error);
      toast({
        variant: "destructive",
        title: "خطأ في تحديث العقار",
        description: "حدث خطأ أثناء تحديث العقار. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!id) {
    return (
      <>
        <Header />
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">معرف العقار مفقود</h2>
          <p className="mb-6">
            عذراً، يبدو أنه تم فقدان معرف العقار. الرجاء المحاولة مرة أخرى من قائمة
            العقارات الخاصة بك.
          </p>
          <Link to="/my-properties">
            <Button>العودة إلى قائمة العقارات</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">تعديل العقار</h1>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="title"
            >
              عنوان العقار
            </label>
            <Input
              id="title"
              type="text"
              placeholder="أدخل عنوان العقار"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="description"
            >
              وصف العقار
            </label>
            <Textarea
              id="description"
              placeholder="أدخل وصفاً مفصلاً للعقار"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="price"
            >
              سعر العقار
            </label>
            <div className="flex rounded-md shadow-sm">
              <Input
                id="price"
                type="number"
                placeholder="أدخل سعر العقار"
                className="ltr:rounded-r-none rtl:rounded-l-none"
                {...form.register("price", { valueAsNumber: true })}
              />
              <Select
                value={form.watch("currency")}
                onValueChange={(value) => form.setValue("currency", value)}
              >
                <SelectTrigger className="ltr:rounded-l-none rtl:rounded-r-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ل.س">ل.س</SelectItem>
                  <SelectItem value="$">$</SelectItem>
                  <SelectItem value="€">€</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.formState.errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="location"
            >
              الموقع
            </label>
            <Input
              id="location"
              type="text"
              placeholder="أدخل موقع العقار بالتفصيل"
              {...form.register("location")}
            />
            {form.formState.errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="city"
            >
              المدينة
            </label>
            <Select
              value={form.watch("city")}
              onValueChange={(value) => form.setValue("city", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="دمشق">دمشق</SelectItem>
                <SelectItem value="حلب">حلب</SelectItem>
                <SelectItem value="حمص">حمص</SelectItem>
                <SelectItem value="اللاذقية">اللاذقية</SelectItem>
                <SelectItem value="طرطوس">طرطوس</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="property_type"
            >
              نوع العقار
            </label>
            <Select
              value={form.watch("property_type")}
              onValueChange={(value) => form.setValue("property_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">شقة</SelectItem>
                <SelectItem value="house">منزل</SelectItem>
                <SelectItem value="villa">فيلا</SelectItem>
                <SelectItem value="land">أرض</SelectItem>
                <SelectItem value="commercial">تجاري</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.property_type && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.property_type.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="status"
            >
              حالة العقار
            </label>
            <Select
              value={form.watch("status")}
              onValueChange={(value) => form.setValue("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">للبيع</SelectItem>
                <SelectItem value="rent">للإيجار</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.status.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium leading-none mb-2"
                htmlFor="bedrooms"
              >
                عدد غرف النوم
              </label>
              <Input
                id="bedrooms"
                type="number"
                placeholder="أدخل عدد غرف النوم"
                {...form.register("bedrooms", { valueAsNumber: true })}
              />
              {form.formState.errors.bedrooms && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.bedrooms.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-none mb-2"
                htmlFor="bathrooms"
              >
                عدد الحمامات
              </label>
              <Input
                id="bathrooms"
                type="number"
                placeholder="أدخل عدد الحمامات"
                {...form.register("bathrooms", { valueAsNumber: true })}
              />
              {form.formState.errors.bathrooms && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.bathrooms.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="area"
            >
              المساحة (م²)
            </label>
            <Input
              id="area"
              type="number"
              placeholder="أدخل مساحة العقار بالمتر المربع"
              {...form.register("area", { valueAsNumber: true })}
            />
            {form.formState.errors.area && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.area.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-none mb-2"
              htmlFor="creationDate"
            >
              تاريخ الإنشاء
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !form.getValues("creationDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.getValues("creationDate") ? (
                    format(form.getValues("creationDate"), "yyyy-MM-dd")
                  ) : (
                    <span>اختر تاريخ</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Controller
                  control={form.control}
                  name="creationDate"
                  render={({ field }) => (
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  )}
                />
              </PopoverContent>
            </Popover>
            {form.formState.errors.creationDate && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.creationDate.message}
              </p>
            )}
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جارٍ التحديث..." : "تحديث العقار"}
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default EditProperty;
