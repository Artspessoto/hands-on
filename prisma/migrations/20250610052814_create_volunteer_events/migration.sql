-- CreateTable
CREATE TABLE "volunteer_events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "maxVolunteers" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VolunteerEventVolunteers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VolunteerEventVolunteers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VolunteerEventVolunteers_B_index" ON "_VolunteerEventVolunteers"("B");

-- AddForeignKey
ALTER TABLE "volunteer_events" ADD CONSTRAINT "volunteer_events_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VolunteerEventVolunteers" ADD CONSTRAINT "_VolunteerEventVolunteers_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VolunteerEventVolunteers" ADD CONSTRAINT "_VolunteerEventVolunteers_B_fkey" FOREIGN KEY ("B") REFERENCES "volunteer_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
