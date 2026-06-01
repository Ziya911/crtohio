import { NextResponse } from 'next/server'
import { driverApplicationSchema } from '@/lib/validations/driver-application'
import { sendEmail } from '@/lib/email/send'
import { DriverApplicationAdminEmail } from '@/lib/email/templates/DriverApplicationAdmin'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = driverApplicationSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    const data = result.data

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `Driver Application: ${data.fullName}`,
        react: DriverApplicationAdminEmail({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          licenseStatus: data.licenseStatus,
          licenseNumber: data.licenseNumber,
          yearsExperience: data.yearsExperience,
          cleanDrivingRecord: data.cleanDrivingRecord,
          hasCprCert: data.hasCprCert,
          wheelchairExperience: data.wheelchairExperience,
          hasOwnCar: data.hasOwnCar,
          carMake: data.hasOwnCar === 'yes' ? data.carMake : undefined,
          carModel: data.hasOwnCar === 'yes' ? data.carModel : undefined,
          availability: data.availability,
          previousTransportExperience: data.previousTransportExperience,
        }),
      }).catch((err) => console.error('[Driver Application Email Error]', err))
    }

    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Driver Application Error]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
